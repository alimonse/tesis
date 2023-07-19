import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CalendarService } from '../../calendar.service';
import { EmpresaModule } from '../empresa/empresa.module';
import { PrestacionesModule } from '../prestaciones/prestaciones.module';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';

@Module({
  providers: [WhatsappService, CalendarService],
  controllers: [WhatsappController],
  imports: [EmpresaModule, PrestacionesModule, HttpModule],
})
export class WhatsappModule {}
