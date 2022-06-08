import { Controller } from '@nestjs/common';
import { ControladorPrincipal } from '../../clases-principales/controlador-principal';
import { SucursalEntity } from './sucursal.entity';
import { SucursalService } from './sucursal.service';
import { SucursalCrearDto } from './dto/sucursal.crear.dto';
import { SucursalActualizarDto } from './dto/sucursal.actualizar.dto';

@Controller('sucursal')
export class SucursalController extends ControladorPrincipal<SucursalEntity> {
  constructor(private readonly _sucursalService: SucursalService) {
    super(_sucursalService, SucursalCrearDto, SucursalActualizarDto);
  }
}
