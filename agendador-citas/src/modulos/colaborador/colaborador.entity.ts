import { Column, Entity } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';

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
  })
  habilitado: number;
}
