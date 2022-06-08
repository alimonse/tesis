import { Column, Entity } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';

@Entity('prestaciones')
export class PrestacionesEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre_servicio',
    type: 'varchar',
  })
  nombreServicio: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
  })
  descripcion: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
  })
  habilitado: number;
}
