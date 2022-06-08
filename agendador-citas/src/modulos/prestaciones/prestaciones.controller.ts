import { Controller } from '@nestjs/common';
import { ControladorPrincipal } from '../../clases-principales/controlador-principal';
import { PrestacionesService } from './prestaciones.service';
import { PrestacionesCrearDto } from './dto/prestaciones.crear.dto';
import { PrestacionesActualizarDto } from './dto/prestaciones.actualizar.dto';
import { PrestacionesEntity } from './prestaciones.entity';

@Controller('prestaciones')
export class PrestacionesController extends ControladorPrincipal<PrestacionesEntity> {
  constructor(private readonly _prestacionesService: PrestacionesService) {
    super(
      _prestacionesService,
      PrestacionesCrearDto,
      PrestacionesActualizarDto,
    );
  }
}
