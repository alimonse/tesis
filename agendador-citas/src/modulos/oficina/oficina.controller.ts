import { Controller } from '@nestjs/common';
import { ControladorPrincipal } from '../../clases-principales/controlador-principal';
import { OficinaEntity } from './oficina.entity';
import { OficinaService } from './oficina.service';
import { OficinaCrearDto } from './dto/oficina.crear.dto';
import { OficinaActualizarDto } from './dto/oficina.actualizar.dto';

@Controller('oficina')
export class OficinaController extends ControladorPrincipal<OficinaEntity> {
  constructor(private readonly _oficinaService: OficinaService) {
    super(_oficinaService, OficinaCrearDto, OficinaActualizarDto);
  }
}
