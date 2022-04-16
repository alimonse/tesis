import { Controller } from '@nestjs/common';
import { ServicePrincipal } from './service-principal';

@Controller()
export class ControllerPrincipal<Entidad> {
  protected readonly _servicio: ServicePrincipal<Entidad>;
  private CrearDto: any;
  private ActualizarDto: any;

  constructor(_servicio: ServicePrincipal<Entidad>, CrearDto, ActualizarDto) {
    this._servicio = _servicio;
    this.CrearDto = CrearDto;
    this.ActualizarDto = this.ActualizarDto;
  }
}
