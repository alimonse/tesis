import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntidadPrincipal {
  @PrimaryGeneratedColumn({
    name: 'ID',
  })
  id: number;

  @CreateDateColumn({
    name: 'FEC_CREACION',
    type: 'timestamp',
    nullable: false,
  })
  fechaCreacion: Date = new Date();

  @UpdateDateColumn({
    name: 'FEC_ACTUALIZACION',
    type: 'timestamp',
    nullable: false,
  })
  fechaActualizacion: Date = new Date();
}
