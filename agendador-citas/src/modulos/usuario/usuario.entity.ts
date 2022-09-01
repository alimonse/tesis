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
    name: 'tinyint',
    type: 'varchar',
    nullable: true,
  })
  habilitado: 1 | 0;

  @OneToMany((type) => CitaEntity, (citas) => citas.usuario, {
    nullable: false,
  })
  citas: CitaEntity[];
}
