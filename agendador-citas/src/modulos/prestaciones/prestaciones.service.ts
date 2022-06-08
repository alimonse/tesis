import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { PrestacionesEntity } from './prestaciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PrestacionesService extends ServicioPrincipal<PrestacionesEntity> {
  constructor(
    @InjectRepository(PrestacionesEntity)
    private readonly _prestacionesRepository: Repository<PrestacionesEntity>,
  ) {
    super(_prestacionesRepository);
  }
}
