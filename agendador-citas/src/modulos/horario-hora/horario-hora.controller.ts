import { Controller } from '@nestjs/common';
import {ControladorPrincipal} from "../../clases-principales/controlador-principal";
import {HorarioHoraEntity} from "./horario-hora.entity";
import {HorarioHoraService} from "./horario-hora.service";
import {HorarioHoraCrearDto} from "./dto/horario-hora.crear.dto";
import {HorarioHoraActualizarDto} from "./dto/horario-hora.actualizar.dto";

@Controller('horario-hora')
export class HorarioHoraController extends ControladorPrincipal<HorarioHoraEntity> {
  constructor(private readonly _horarioHoraService: HorarioHoraService) {
    super(_horarioHoraService, HorarioHoraCrearDto, HorarioHoraActualizarDto);
  }
}

