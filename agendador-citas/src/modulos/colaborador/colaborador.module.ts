import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';

@Module({
  providers: [ColaboradorService],
  controllers: [ColaboradorController]
})
export class ColaboradorModule {}
