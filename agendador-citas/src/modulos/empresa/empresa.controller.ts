import { Controller } from '@nestjs/common';
import { ControladorPrincipal } from '../../clases-principales/controlador-principal';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaCrearDto } from './dto/empresa.crear.dto';
import { EmpresaActualizarDto } from './dto/empresa.actualizar.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController extends ControladorPrincipal<EmpresaEntity> {
  constructor(private readonly _empresaService: EmpresaService) {
    super(_empresaService, EmpresaCrearDto, EmpresaActualizarDto);
  }
}
