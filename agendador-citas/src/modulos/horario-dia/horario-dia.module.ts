import { Module } from '@nestjs/common';
import { HorarioDiaController } from './horario-dia/horario-dia.controller';
import { HorarioDiaController } from './horario-dia.controller';
import { HorarioDiaService } from './horario-dia.service';

@Module({
  controllers: [HorarioDiaController],
  providers: [HorarioDiaService]
})
export class HorarioDiaModule {}
