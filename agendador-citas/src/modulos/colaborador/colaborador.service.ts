import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { ColaboradorEntity } from './colaborador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColaboradorService extends ServicioPrincipal<ColaboradorEntity> {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly _colaboradorRepository: Repository<ColaboradorEntity>,
  ) {
    super(_colaboradorRepository);
  }
}
