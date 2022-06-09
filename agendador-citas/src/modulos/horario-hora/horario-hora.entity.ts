import {Column, Entity, ManyToOne} from "typeorm";
import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {HorarioDiaEntity} from "../horario-dia/horario-dia.entity";

@Entity('horario-hora')

export class HorarioHoraEntity extends EntidadPrincipal {

  @Column({
    name: 'desde',
    type: 'datetime',
    nullable: true
  })
  desde: string;

  @Column({
    name: 'hasta',
    type: 'datetime',
    nullable: true
  })
  hasta: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    nullable: true
  })
  habilitado: 1 | 0;

  @ManyToOne(() => HorarioDiaEntity, (horarioDia) => horarioDia.horariosHora)
  horarioDia: HorarioDiaEntity | number


}

