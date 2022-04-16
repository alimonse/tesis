import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ServicePrincipal<Entidad> {
  protected readonly _repository: Repository<Entidad>;

  constructor(_repository: Repository<Entidad>) {
    this._repository = _repository;
  }

  async create(dato: Entidad): Promise<Entidad> {
    return this._repository.save(dato)
  }


}
