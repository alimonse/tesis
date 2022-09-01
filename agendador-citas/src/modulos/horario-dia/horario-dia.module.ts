import { Module } from '@nestjs/common';
import { HorarioDiaController } from './horario-dia.controller';
import { HorarioDiaService } from './horario-dia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioDiaEntity } from './horario-dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioDiaEntity], 'default')],
  controllers: [HorarioDiaController],
  providers: [HorarioDiaService],
  exports: [HorarioDiaService],
})
export class HorarioDiaModule {}
