import { Column, Entity, OneToMany } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { SucursalEntity } from '../sucursal/sucursal.entity';

@Entity('empresa')
export class EmpresaEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_comercial',
    type: 'varchar',
  })
  nombreComercial: string;

  @Column({
    name: 'mensaje_saludo',
    type: 'varchar',
  })
  mensajeSaludo: string;

  @Column({
    name: 'informacion',
    type: 'varchar',
    length: 32765
  })
  informacion: string;

  @Column({
    name: 'lat',
    type: 'decimal',
  })
  lat: string;

  @Column({
    name: 'lng',
    type: 'decimal',
  })
  lng: number;

  @Column({
    name: 'ruc',
    type: 'varchar',
  })
  ruc: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    default: 1,
  })
  habilitado: 0 | 1;

  @OneToMany(() => SucursalEntity, (sucursales) => sucursales.empresa)
  sucursales: SucursalEntity[];
}
