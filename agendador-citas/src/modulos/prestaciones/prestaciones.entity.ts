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

  @Column({
    name: 'tiempo_aproximado',
    type: 'datetime',
    nullable: true,
  })
  tiempoAproximado: string;

  @Column({
    name: 'tiempo_espera',
    type: 'datetime',
    nullable: true,
  })
  tiempoEspera: string;

}
