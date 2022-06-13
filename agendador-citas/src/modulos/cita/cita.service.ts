import { Injectable } from '@nestjs/common';
import {ServicioPrincipal} from "../../clases-principales/servicio-principal";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CitaEntity} from "./cita.entity";

@Injectable()
export class CitaService extends ServicioPrincipal<CitaEntity> {
  constructor(
    @InjectRepository(CitaEntity)
    private readonly _citaRepository: Repository<CitaEntity>) {
    super(_citaRepository);
  }
}
