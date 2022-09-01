import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService extends ServicioPrincipal<UsuarioEntity> {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>,
  ) {
    super(_usuarioRepository);
  }
}
