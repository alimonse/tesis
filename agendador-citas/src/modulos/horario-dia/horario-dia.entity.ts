import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {ColaboradorEntity} from "../colaborador/colaborador.entity";
import {HorarioHoraEntity} from "../horario-hora/horario-hora.entity";

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

  @ManyToOne(() => ColaboradorEntity, (colaborador) => colaborador.horariosDia)
  colaborador: ColaboradorEntity | number;

  @OneToMany(() => HorarioHoraEntity, (horariosHora) => horariosHora.horarioDia)
  horariosHora: HorarioHoraEntity[];

}
