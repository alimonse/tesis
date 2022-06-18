import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import config from "./environment/config";
import {DatabaseModule} from "./database/database.module";
import {CitaModule} from "./modulos/cita/cita.module";
import {ColaboradorModule} from "./modulos/colaborador/colaborador.module";
import {EmpresaModule} from "./modulos/empresa/empresa.module";
import {HorarioDiaModule} from "./modulos/horario-dia/horario-dia.module";
import {HorarioHoraModule} from "./modulos/horario-hora/horario-hora.module";
import {OficinaModule} from "./modulos/oficina/oficina.module";
import {PrestacionesModule} from "./modulos/prestaciones/prestaciones.module";
import {SucursalModule} from "./modulos/sucursal/sucursal.module";
import {UsuarioModule} from "./modulos/usuario/usuario.module";
import {AgenteModule} from "./modulos/agente/agente.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
      DatabaseModule,

      CitaModule,
      UsuarioModule,
      ColaboradorModule,
      EmpresaModule,
      HorarioDiaModule,
      HorarioHoraModule,
      OficinaModule,
      PrestacionesModule,
      SucursalModule,

      AgenteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
