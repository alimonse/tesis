import { Controller } from '@nestjs/common';
import { ControladorPrincipal } from '../../clases-principales/controlador-principal';
import { ColaboradorEntity } from './colaborador.entity';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorCrearDto } from './dto/colaborador.crear.dto';
import { ColaboradorActualizarDto } from './dto/colaborador.actualizar.dto';

@Controller('colaborador')
export class ColaboradorController extends ControladorPrincipal<ColaboradorEntity> {
  constructor(private readonly _colaboradorService: ColaboradorService) {
    super(_colaboradorService, ColaboradorCrearDto, ColaboradorActualizarDto);
  }
}
