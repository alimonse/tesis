import { DatabaseModule } from '../../database/database.module';
import { UsuarioModule } from '../../modulos/usuario/usuario.module';
import { CitaModule } from '../../modulos/cita/cita.module';
import { ColaboradorModule } from '../../modulos/colaborador/colaborador.module';
import { EmpresaModule } from '../../modulos/empresa/empresa.module';
import { HorarioDiaModule } from '../../modulos/horario-dia/horario-dia.module';
import { HorarioHoraModule } from '../../modulos/horario-hora/horario-hora.module';
import { OficinaModule } from '../../modulos/oficina/oficina.module';
import { PrestacionesModule } from '../../modulos/prestaciones/prestaciones.module';
import { SucursalModule } from '../../modulos/sucursal/sucursal.module';
import { HttpModule } from '@nestjs/axios';
import { AgenteModule } from '../../modulos/agente/agente.module';

export const MODULOS_AGENDADOR_CITAS = [
  UsuarioModule,
  CitaModule,
  ColaboradorModule,
  EmpresaModule,
  HorarioDiaModule,
  HorarioHoraModule,
  OficinaModule,
  PrestacionesModule,
  SucursalModule,
  DatabaseModule,
  HttpModule,
  // AgenteModule,
];
