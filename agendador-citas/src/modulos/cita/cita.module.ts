import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CitaEntity} from "./cita.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CitaEntity],'default')],
  providers: [CitaService],
  controllers: [CitaController],
  exports: [CitaService]
})
export class CitaModule {}
