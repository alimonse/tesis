import { Injectable } from '@nestjs/common';
import {ServicioPrincipal} from "../../clases-principales/servicio-principal";
import {HorarioDiaEntity} from "../horario-dia/horario-dia.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HorarioHoraEntity} from "./horario-hora.entity";

@Injectable()
export class HorarioHoraService extends ServicioPrincipal<HorarioHoraEntity> {
  constructor(
    @InjectRepository(HorarioHoraEntity)
    private readonly _horarioHoraRepository: Repository<HorarioHoraEntity>) {
    super(_horarioHoraRepository);
  }
}
