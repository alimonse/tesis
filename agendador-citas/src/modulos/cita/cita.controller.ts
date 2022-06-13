import { Controller } from '@nestjs/common';
import {ControladorPrincipal} from "../../clases-principales/controlador-principal";
import {CitaEntity} from "./cita.entity";
import {CitaCrearDto} from "./dto/cita.crear.dto";
import {CitaActualizarDto} from "./dto/cita.actualizar.dto";
import {CitaService} from "./cita.service";

@Controller('cita')
export class CitaController extends ControladorPrincipal<CitaEntity> {
  constructor(private readonly _citaService: CitaService) {
    super(_citaService, CitaCrearDto, CitaActualizarDto);
  }
}
