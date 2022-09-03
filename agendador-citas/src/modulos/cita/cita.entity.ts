import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrestacionesEntity } from '../prestaciones/prestaciones.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('cita')
export class CitaEntity extends EntidadPrincipal {
  @Column({
    name: 'calednar_id',
    type: 'varchar',
  })
  caledarId: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
  })
  descripcion: string;

  @Column({
    name: 'dia',
    type: 'date',
  })
  dia: string;

  @Column({
    name: 'hora_inicio',
    type: 'datetime',
  })
  horaInicio: string;

  @Column({
    name: 'hora_fin',
    type: 'datetime',
  })
  horaFin: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    default: 1,
  })
  habilitado: 0 | 1;

  @ManyToOne(() => PrestacionesEntity, (prestaciones) => prestaciones.citas, {
    nullable: false,
  })
  prestaciones: PrestacionesEntity | number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.citas, {
    nullable: false,
  })
  usuario: UsuarioEntity | number;
}
