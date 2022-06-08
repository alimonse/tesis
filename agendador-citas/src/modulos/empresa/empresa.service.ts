import { Injectable } from '@nestjs/common';
import { ServicioPrincipal } from '../../clases-principales/servicio-principal';
import { EmpresaEntity } from './empresa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresaService extends ServicioPrincipal<EmpresaEntity> {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly _empresaRepository: Repository<EmpresaEntity>,
  ) {
    super(_empresaRepository);
  }
}
