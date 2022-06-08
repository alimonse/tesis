import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {Column, Entity} from "typeorm";

@Entity('horario-dia')
export class HorarioDiaEntity extends EntidadPrincipal {
  @Column({
    name: 'dia',
    type: 'varchar',
    nullable: true
  })
  dia: string;

  @Column({
    name: 'habilitado',
    type: "tinyint",
    nullable: true
  })
  habilitado: 1 | 0;

}
