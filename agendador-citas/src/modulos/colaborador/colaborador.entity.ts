import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { PrestacionesEntity } from '../prestaciones/prestaciones.entity';

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
    default: 1,
  })
  habilitado: 0 | 1;

  @OneToMany(
    () => PrestacionesEntity,
    (prestaciones) => prestaciones.colaborador,
  )
  prestaciones: PrestacionesEntity[];
}
