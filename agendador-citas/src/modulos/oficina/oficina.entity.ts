import { Column, Entity } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';

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
}
