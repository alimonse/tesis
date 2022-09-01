import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntidadPrincipal extends BaseEntity {
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

// export abstract class DateAuditEntity extends BaseEntity {
//   @CreateDateColumn({
//     // default: () => 'CURRENT_TIMESTAMP',
//   })
//   createAt: Date;
//
//   @UpdateDateColumn({
//     // default: () => 'CURRENT_TIMESTAMP',
//   })
//   upateAt: Date;
// }
