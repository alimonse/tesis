import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HorarioHoraEntity } from '../horario-hora/horario-hora.entity';
import { PrestacionesEntity } from '../prestaciones/prestaciones.entity';

@Entity('horario-dia')
export class HorarioDiaEntity extends EntidadPrincipal {
  @Column({
    name: 'dia',
    type: 'date',
  })
  dia: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    default: 1,
  })
  habilitado: 1 | 0;

  // @ManyToOne(() => ColaboradorEntity, (colaborador) => colaborador.horariosDia)
  // colaborador: ColaboradorEntity | number;

  @ManyToOne(() => PrestacionesEntity, (prestacion) => prestacion.horarioDias)
  prestacion: PrestacionesEntity | number;

  @OneToMany(() => HorarioHoraEntity, (horariosHora) => horariosHora.horarioDia)
  horariosHora: HorarioHoraEntity[];
}
