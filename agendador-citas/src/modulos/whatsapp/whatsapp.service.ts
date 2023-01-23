import { Injectable } from '@nestjs/common';
import {Twilio} from "twilio";
const accountSid = 'ACcb8a178aa4a7cd9b79782d9e9de4bb1b';
const authToken = '9986be4dcac62d35bf3f353ee7a38daf';

@Injectable()
export class WhatsappService {
  sendNotification(body: string, phone: string) {
    const client = new Twilio(accountSid, authToken);
    client.messages
      .create({
        body,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+593${phone}`,
      })
      .then((message) => console.log(message.sid))
      .catch(console.log);
  }
}
