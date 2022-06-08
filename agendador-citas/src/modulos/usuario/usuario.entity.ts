import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {Column} from "typeorm";

export class UsuarioEntity extends EntidadPrincipal{
  @Column({
    name: 'nombre',
    type: 'varchar',
    nullable: true
  })
  nombre: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    nullable: true
  })
  telefono: string;

  @Column({
    name: 'tinyint',
    type: 'varchar',
    nullable: true
  })
  habilitado: 1 | 0;

}
