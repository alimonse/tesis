import { Module } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { OficinaController } from './oficina.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OficinaEntity} from "./oficina.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OficinaEntity],'default')],
  providers: [OficinaService],
  controllers: [OficinaController],
  exports: [OficinaService],
})
export class OficinaModule {}
