import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ServicioPrincipal<Entidad> {
  protected readonly _repository: Repository<Entidad>;

  constructor(_repository: Repository<Entidad>) {
    this._repository = _repository;
  }

  async create(dato: Entidad): Promise<Entidad> {
    return await this._repository.save(dato);
  }

  async update(
    id: number,
    dato: QueryDeepPartialEntity<Entidad>,
  ): Promise<Entidad> {
    const datoEncontrado = await this._repository.findOne(id);
    if (!datoEncontrado) {
      throw new NotFoundException('No se encontro el dato a actualizar');
    }

    await this._repository.update(id, dato);
    return await this._repository.findOne(id);
  }

  async findAll(consulta?: string): Promise<[Entidad[], number]> {
    const JsonConsulta = consulta ? JSON.parse(consulta) : undefined;
    if (!JsonConsulta || !Object.keys(JsonConsulta).length) {
      return await this._repository.findAndCount();
    }
    Object.values(JsonConsulta.where).forEach((valor) => {
      if (typeof valor === 'string') {
        if (valor.includes('Like')) {
          const separador1 = valor.indexOf('%');
          const separador2 = valor.lastIndexOf('%');
          const stringABuscar = valor.substring(separador1, separador2 + 1);
          for (const key in JsonConsulta.where) {
            if (JsonConsulta.where[key] === valor) {
              JsonConsulta.where[key] = Like(stringABuscar);
            }
          }
        }
      }
    });
    return await this._repository.findAndCount(JsonConsulta);
  }

  async findById(id: number): Promise<Entidad> {
    return await this._repository.findOne(id);
  }
}
