import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';

@Module({
  providers: [CitaService],
  controllers: [CitaController]
})
export class CitaModule {}
