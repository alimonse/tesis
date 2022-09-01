import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { Column, Entity, OneToMany } from 'typeorm';
import { CitaEntity } from '../cita/cita.entity';

@Entity('usuario')
export class UsuarioEntity extends EntidadPrincipal {
  @Column({
    name: 'nombre',
    type: 'varchar',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    nullable: true,
  })
  telefono: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    default: 1,
    nullable: true,
  })
  habilitado: 1 | 0;

  @OneToMany(() => CitaEntity, (citas) => citas.usuario)
  citas: CitaEntity[];
}
