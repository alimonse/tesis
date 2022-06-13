import { Controller } from '@nestjs/common';
import {ControladorPrincipal} from "../../clases-principales/controlador-principal";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioCrearDto} from "./dto/usuario.crear.dto";
import {UsuarioActualizarDto} from "./dto/usuario.actualizar.dto";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController extends ControladorPrincipal<UsuarioEntity> {
  constructor(private readonly _usuarioService: UsuarioService) {
    super(_usuarioService, UsuarioCrearDto, UsuarioActualizarDto);
  }
}

