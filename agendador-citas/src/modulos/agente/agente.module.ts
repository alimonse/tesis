import { Module } from '@nestjs/common';
import { AgenteController } from './agente.controller';
import { AgenteService } from './agente.service';
import { EmpresaModule } from '../empresa/empresa.module';
import { PrestacionesModule } from '../prestaciones/prestaciones.module';
import { CalendarService } from "../../calendar.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [AgenteController],
  providers: [AgenteService, CalendarService],
  exports: [AgenteService],
  imports: [EmpresaModule, PrestacionesModule, HttpModule],
})
export class AgenteModule {}
