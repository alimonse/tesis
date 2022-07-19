import { Module } from '@nestjs/common';
import { AgenteController } from './agente.controller';
import { AgenteService } from './agente.service';
import {EmpresaModule} from "../empresa/empresa.module";

@Module({
  controllers: [AgenteController],
  providers: [AgenteService],
  exports: [AgenteService],
  imports: [EmpresaModule],
})
export class AgenteModule {}
