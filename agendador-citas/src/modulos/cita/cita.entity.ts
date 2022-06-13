import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {Column, Entity, ManyToOne} from "typeorm";
import {PrestacionesEntity} from "../prestaciones/prestaciones.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('cita')
export class CitaEntity extends EntidadPrincipal {

  @Column({
    name: 'dia',
    type: 'datetime',
    nullable: true
  })
  dia: string;

  @Column({
    name: 'hora_inicio',
    type: 'time',
    nullable: true
  })
  horaInicio: string;

  @Column({
    name: 'hora_fin',
    type: 'time',
    nullable: true
  })
  horaFin: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    nullable: true
  })
  habilitado: 0 | 1;

  @ManyToOne(() => PrestacionesEntity, (prestaciones) => prestaciones.citas)
  prestaciones: PrestacionesEntity | number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.citas)
  usuario: UsuarioEntity | number
}
