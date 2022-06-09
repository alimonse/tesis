import {EntidadPrincipal} from "../../clases-principales/entidad-principal";
import {Column, OneToMany} from "typeorm";
import {CitaEntity} from "../cita/cita.entity";

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

  // @OneToMany(() => CitaEntity, (citas) => citas.usuario)
  // citas: CitaEntity[];

}