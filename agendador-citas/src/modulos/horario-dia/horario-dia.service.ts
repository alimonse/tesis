import { Injectable } from '@nestjs/common';
import {ServicioPrincipal} from "../../clases-principales/servicio-principal";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HorarioDiaEntity} from "./horario-dia.entity";

@Injectable()
export class HorarioDiaService extends ServicioPrincipal<HorarioDiaEntity> {
  constructor(
    @InjectRepository(HorarioDiaEntity)
    private readonly _horarioDiaRepository: Repository<HorarioDiaEntity>) {
    super(_horarioDiaRepository);
  }
}
