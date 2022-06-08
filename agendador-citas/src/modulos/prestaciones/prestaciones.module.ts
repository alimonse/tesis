import { Module } from '@nestjs/common';
import { PrestacionesController } from './prestaciones.controller';
import { PrestacionesService } from './prestaciones.service';

@Module({
  controllers: [PrestacionesController],
  providers: [PrestacionesService]
})
export class PrestacionesModule {}
