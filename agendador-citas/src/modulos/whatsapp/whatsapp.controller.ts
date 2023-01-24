import { Body, Controller, Post } from '@nestjs/common';
import { BodyTwilioInterface } from '../../interfaces/body-twilio.interface';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly _whatsAppService: WhatsappService) {}
  @Post()
  send() {
    this._whatsAppService.sendNotification('hola mundo', '998047440');
    return 'envio';
  }

  @Post('receive')
  receive(@Body() payload: BodyTwilioInterface) {
    console.log(payload);
    this._whatsAppService.chatBot(payload.Body, payload.WaId);
    return 'recive';
  }
}
