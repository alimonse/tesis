import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { OficinaEntity } from './oficina.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OficinaService extends ServicioPrincipal<OficinaEntity> {
  constructor(private readonly _oficinaRepository: Repository<OficinaEntity>) {
    super(_oficinaRepository);
  }
}
