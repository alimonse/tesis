import {Column, Entity, OneToMany} from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import {PrestacionesEntity} from "../prestaciones/prestaciones.entity";
import {HorarioDiaEntity} from "../horario-dia/horario-dia.entity";

@Entity('colaborador')
export class ColaboradorEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_colaborador',
    type: 'varchar',
  })
  nombreColaborador: string;

  @Column({
    name: 'correo',
    type: 'varchar',
  })
  correo: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
  })
  habilitado: number;

  @OneToMany(() => PrestacionesEntity, (prestaciones) => prestaciones.colaborador)
  prestaciones: PrestacionesEntity[];

  @OneToMany(() => HorarioDiaEntity, (horariosDia) => horariosDia.colaborador)
  horariosDia: HorarioDiaEntity[];
}
