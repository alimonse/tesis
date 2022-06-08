import { Module } from '@nestjs/common';
import { HorarioHoraController } from './horario-hora.controller';
import { HorarioHoraService } from './horario-hora.service';

@Module({
  controllers: [HorarioHoraController],
  providers: [HorarioHoraService]
})
export class HorarioHoraModule {}
