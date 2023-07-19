import { Controller } from '@nestjs/common';
import {ControladorPrincipal} from "../../clases-principales/controlador-principal";
import {HorarioDiaEntity} from "./horario-dia.entity";
import {HorarioDiaService} from "./horario-dia.service";
import {HorarioDiaActualizarDto} from "./dto/horario-dia.actualizar.dto";
import {HorarioDiaCrearDto} from "./dto/horario-dia.crear.dto";

@Controller('horario-dia')
export class HorarioDiaController extends ControladorPrincipal<HorarioDiaEntity> {
  constructor(private readonly _horarioDiaService: HorarioDiaService) {
    super(_horarioDiaService, HorarioDiaCrearDto, HorarioDiaActualizarDto);
  }
}

