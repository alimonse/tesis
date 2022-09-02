import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntidadPrincipal } from '../../clases-principales/entidad-principal';
import { OficinaEntity } from '../oficina/oficina.entity';
import { ColaboradorEntity } from '../colaborador/colaborador.entity';
import { CitaEntity } from '../cita/cita.entity';
import { HorarioDiaEntity } from '../horario-dia/horario-dia.entity';

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
    name: 'tiempo_aproximado',
    type: 'datetime',
  })
  tiempoAproximado: string;

  @Column({
    name: 'tiempo_espera',
    type: 'datetime',
  })
  tiempoEspera: string;

  @Column({
    name: 'habilitado',
    type: 'tinyint',
    default: 1,
  })
  habilitado: 0 | 1;

  @ManyToOne(() => OficinaEntity, (oficina) => oficina.prestaciones)
  oficina: OficinaEntity | number;

  @ManyToOne(() => ColaboradorEntity, (colaborador) => colaborador.prestaciones)
  colaborador: ColaboradorEntity | number;

  @ManyToOne(() => HorarioDiaEntity, (horarioDia) => horarioDia.horariosHora)
  horarioDia: HorarioDiaEntity | number;

  @OneToMany(() => CitaEntity, (citas) => citas.prestaciones)
  citas: CitaEntity[];
}
