import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { SucursalEntity } from '../sucursal/sucursal.entity';
import { PrestacionesEntity } from '../prestaciones/prestaciones.entity';

@Entity('oficina')
export class OficinaEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_oficina',
    type: 'varchar',
  })
  nombreOficina: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
  })
  habilitado: number;

  @ManyToOne(() => SucursalEntity, (sucursal) => sucursal.oficinas)
  sucursal: SucursalEntity | number;

  @OneToMany(() => PrestacionesEntity, (prestaciones) => prestaciones.oficina)
  prestaciones: PrestacionesEntity[];
}
