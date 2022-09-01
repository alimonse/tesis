import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorEntity } from './colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColaboradorEntity], 'default')],
  providers: [ColaboradorService],
  controllers: [ColaboradorController],
  exports: [ColaboradorService],
})
export class ColaboradorModule {}
