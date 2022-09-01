import { EmpresaEntity } from '../../modulos/empresa/empresa.entity';
import { SucursalEntity } from '../../modulos/sucursal/sucursal.entity';
import { OficinaEntity } from '../../modulos/oficina/oficina.entity';
import { PrestacionesEntity } from '../../modulos/prestaciones/prestaciones.entity';
import { ColaboradorEntity } from '../../modulos/colaborador/colaborador.entity';
import { HorarioDiaEntity } from '../../modulos/horario-dia/horario-dia.entity';
import { HorarioHoraEntity } from '../../modulos/horario-hora/horario-hora.entity';
import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';
import { CitaEntity } from '../../modulos/cita/cita.entity';

export const ENTIDADES_AGENDADOR_CITAS = [
  UsuarioEntity,
  EmpresaEntity,
  SucursalEntity,
  OficinaEntity,
  PrestacionesEntity,
  ColaboradorEntity,
  CitaEntity,
  HorarioDiaEntity,
  HorarioHoraEntity,
];
