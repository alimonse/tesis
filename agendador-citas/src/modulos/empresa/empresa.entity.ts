import { Column, Entity } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';

@Entity('empresa')
export class EmpresaEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_comercial',
    type: 'varchar',
  })
  nombreComercial: string;

  @Column({
    name: 'ruc',
    type: 'varchar',
  })
  ruc: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
  })
  habilitado: 0 | 1;
}
