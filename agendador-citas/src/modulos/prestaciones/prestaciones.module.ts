import { Module } from '@nestjs/common';
import { PrestacionesController } from './prestaciones.controller';
import { PrestacionesService } from './prestaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestacionesEntity } from './prestaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrestacionesEntity], 'default')],
  controllers: [PrestacionesController],
  providers: [PrestacionesService],
  exports: [PrestacionesService],
})
export class PrestacionesModule {}
