import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { google } from 'googleapis';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const event = {
  summary: 'My first event!',
  location: 'Hyderabad,India',
  description: 'First event with nodeJS!',
  start: {
    dateTime: '2022-06-10T09:00:00-07:00',
    timeZone: 'Asia/Dhaka',
  },
  end: {
    dateTime: '2022-06-11T17:00:00-07:00',
    timeZone: 'Asia/Dhaka',
  },
  attendees: [],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 10 },
    ],
  },
};

const calendarId = 'men9sqna8sqsenuu80gjon8olo@group.calendar.google.com';

// import { InjectSchedule, Schedule } from 'nest-schedule';

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description: string;
  // ...
  // more properties can be found here:
  // https://googleapis.dev/nodejs/googleapis/latest/calendar/interfaces/Schema$Event.html
}

/*
 * CalendarService for polling a Google Calendar and looking for scheduled events to broadcast
 * in a slack channel at the scheduled time. For each event, a message can be set explicitely.
 *
 * - A calendar must be selected with an id specified in the CALENDAR_ID environment variable
 * - A service account json must be available through a location set in GOOGLE_APPLICATION_CREDENTIALS
 * - Event summary (title) must be in the format of '[#channel] ...',  e.g. '[#general] simple reminder'
 * - The broadcasted message must be placed in the event description
 * - A processed event summary will be set to '[!channel]' (or '[?channel]' if no message was found)
 *
 * The Google NodeJS API can be found here:
 * https://github.com/googleapis/google-api-nodejs-client
 *
 * The Google calendar API and resources can be found here:
 * https://googleapis.dev/nodejs/googleapis/latest/calendar/index.html
 */

@Injectable()
export class CalendarService {
  calendar: ReturnType<typeof google.calendar>;
  POLLING_INTERVAL = 5 * 1000; // in milliseconds

  constructor(
    private httpService: HttpService, // @InjectSchedule() private readonly schedule: Schedule,
  ) {
    // Connecting to google calendar is asynchronous, fired from constructor
    this.connectToCalendar();
  }

  async connectToCalendar() {
    try {
      // Create a new GoogleAuth instance with service-account credentials from a json file.
      // Note: credential file location must be set in GOOGLE_APPLICATION_CREDENTIALS env variable
      const rutaKey = path.join(__dirname, '..', '/src/calendar.json');
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/calendar'],
        keyFile: rutaKey,
        projectId: calendarId,
      });

      this.calendar = google.calendar({
        version: 'v3',
        auth: await auth.getClient(),
      });

      this.calendar.events.insert(
        {
          auth: await auth.getClient(),
          calendarId: calendarId,
          requestBody: event,
        },
        (a, b) => {
          console.log(b, a);
        },
      );
    } catch (err) {
      console.log(`[calendar] could not connect to calendar API: ${err}`);
      return;
    }

    console.log('[calendar] successfully connected to calendar API');

    if (!calendarId) {
      console.log('[calendar] no CALENDAR_ID found in env, poller not started');
      return;
    }

    console.log('[calendar] starting poller');

    this.pollCalendarEvents();
    // this.schedule.scheduleIntervalJob('poller', this.POLLING_INTERVAL, () =>
    //   this.pollCalendarEvents(),
    // );
  }

  async listarEventos() {
    try {
      const listaEventos = await this.calendar.events.list({
        calendarId: calendarId,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const eventosLimpios = listaEventos.data.items.map((eventos) => {
        return {
          nombreEvento: eventos.summary,
          start: eventos.start.date,
          end: eventos.end.date,
        };
      });

      console.log(eventosLimpios, 'eventos limpios');
    } catch (e) {
      console.log(e, 'error');
    }
  }

  async pollCalendarEvents() {
    console.debug('[calendar] polling messages...');

    // Define a range of twice the polling interval (in case of polling delays)
    const timeNow = new Date();
    const timeMin = new Date(timeNow.getTime() - this.POLLING_INTERVAL * 2);

    try {
      // Request all events in the selected calendar in the selected range
      const response = await this.calendar.events.list({
        calendarId: calendarId,
        singleEvents: true, // Flatten any recurring events
        // timeMin: timeMin.toISOString(),
        // timeMax: timeNow.toISOString(),
      });

      const events = response.data.items as GoogleCalendarEvent[];

      // Process events one by one (sequentially)
      for (const event of events) {
        console.debug(`[calendar] found event: ${event.summary}`);
        await this.processEvent(event);
      }
    } catch (err) {
      console.log(`[calendar] poller failed: ${err}`);
    }

    // Keep the interval job running
    return false;
  }

  async processEvent(event: GoogleCalendarEvent) {
    // console.log(event);
    // // Test event for a summary in the format of '[#channel] ...'
    // const regex = /^\[(#[a-z0-9-_]+)\]/;
    // const elements = regex.exec(event.summary);
    //
    // // This event does not match format (could have been processed before)
    // if (elements === null) {
    //   return;
    // }
    //
    // console.log(`[calendar] processing event: ${event.summary}`);
    //
    // // Channel is extracted from regex, message is in event description
    // const channel = elements[1]; // first captured group
    // const message = event.description;
    //
    // if (message) {
    //   console.log('mensaje', message, channel);
    //   // await this.postSlackMessage(channel, message);
    // }
    //
    // // Set new summary to '[!channel] ...' (or '[?channel] ...' if no message was found)
    // const newSymbol = message ? '!' : '?';
    // const newSummary = '[' + newSymbol + event.summary.substring(2);
    //
    // // Patch calendar event with new summary
    // await this.calendar.events.patch({
    //   calendarId: process.env.EVENT_CALENDAR_ID,
    //   eventId: event.id,
    //   requestBody: {
    //     summary: newSummary,
    //   },
    // });
  }

  async postSlackMessage(channel: string, text: string) {
    const data = { channel, text, link_names: true };
    const config = {
      headers: { Authorization: 'Bearer ' + process.env.SLACK_TOKEN },
    };
    const endpoint = 'https://slack.com/api/chat.postMessage';

    await this.httpService.post(endpoint, data, config).toPromise();
  }
}
