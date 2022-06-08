import { Column, Entity } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';

@Entity('sucursal')
export class SucursalEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_sucursal',
    type: 'varchar',
  })
  nombreSucursal: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
  })
  direccion: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
  })
  telefono: string;

  @Column({
    name: 'correo',
    type: 'varchar',
  })
  correo: string;

  @Column({
    name: 'tipo_empresa',
    type: 'varchar',
  })
  tipoEmpresa: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
  })
  habilitado: 1 | 0;
}
