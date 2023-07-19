export interface GoogleCalendarEventInterface {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  // start?: End;
  // end?: End;
  // attendees?: any[];
  // reminders?: Reminders;
}

interface End {
  dateTime?: Date;
  timeZone: string;
}

interface Reminders {
  useDefault?: boolean;
  overrides?: Override[];
}

interface Override {
  method?: string;
  minutes?: number;
}

// export interface GoogleCalendarEventInterface {
//   id: string;
//   summary: string;
//   description: string;
//   // ...
//   // more properties can be found here:
//   // https://googleapis.dev/nodejs/googleapis/latest/calendar/interfaces/Schema$Event.html
// }
