import { Module } from '@nestjs/common';
import { HorarioHoraController } from './horario-hora.controller';
import { HorarioHoraService } from './horario-hora.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioHoraEntity } from './horario-hora.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioHoraEntity], 'default')],
  controllers: [HorarioHoraController],
  providers: [HorarioHoraService],
  exports: [HorarioHoraService],
})
export class HorarioHoraModule {}
