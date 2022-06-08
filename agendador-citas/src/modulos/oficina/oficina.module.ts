import { Module } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { OficinaController } from './oficina.controller';

@Module({
  providers: [OficinaService],
  controllers: [OficinaController]
})
export class OficinaModule {}
