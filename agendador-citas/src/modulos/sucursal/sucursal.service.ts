import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { SucursalEntity } from './sucursal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SucursalService extends ServicioPrincipal<SucursalEntity> {
  constructor(
    @InjectRepository(SucursalEntity)
    private readonly _sucursalRepository: Repository<SucursalEntity>,
  ) {
    super(_sucursalRepository);
  }
}
