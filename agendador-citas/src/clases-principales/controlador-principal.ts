import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {validate} from "class-validator";
import { ServicioPrincipal } from './servicio-principal';


@Controller()
export class ControladorPrincipal<Entidad> {

  constructor(
    private _servicio: ServicioPrincipal<Entidad>,
    private CrearDto,
    private ActualizarDto) {}

  @Post()
  async create(@Body() dato): Promise<Entidad> {
    const dtoValidation = plainToClass(this.CrearDto, dato, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dtoValidation);
    if (errors.length) {
      console.error({
        mensaje: 'Error con parametros enviados',
        error: JSON.stringify(errors, null, 3),
      });
      throw new BadRequestException('Error con parametros enviados');
    }
    try {
      return await this._servicio.create(dato);
    } catch (e) {
      console.error({
        mensaje: 'Error creando',
        error: e,
      });
      throw new InternalServerErrorException('Error creando');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dato: Entidad,
  ): Promise<Entidad> {
    const dtoValidation = plainToClass(this.ActualizarDto, dato, {
      excludeExtraneousValues: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const errors = await validate(dtoValidation);
    if (errors.length) {
      console.error({
        mensaje: 'Error con paramtros enviados',
        error: JSON.stringify(errors, null, 3),
      });
      throw new BadRequestException('Error con paramtros enviados');
    }
    try {
      return await this._servicio.update(id, dato);
    } catch (e) {
      console.error({
        mensaje: 'Error actualizando',
        error: e,
      });
      throw new InternalServerErrorException('Error actualizando');
    }
  }

  @Get('id')
  async findById(@Param('id') id: number): Promise<Entidad> {
    try {
      return await this._servicio.findById(Number(id));
    } catch (e) {
      console.error({
        mensaje: 'Error buscando por id',
        error: JSON.stringify(e, null, 3),
      });
      throw new InternalServerErrorException('Error buscando por id');
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() consulta): Promise<[Entidad[], number]> {
    try {
      return await this._servicio.findAll(consulta?.busqueda);
    } catch (e) {
      console.error({
        mensaje: 'Error buscando todos',
        error: e,
      });
      throw new InternalServerErrorException('Error buscando todos');
    }
  }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<Entidad> {
  //   try {
  //     return await this._servicio.delete(id);
  //   } catch (e) {
  //     console.error({
  //       mensaje: 'Error eliminando',
  //       error: e,
  //     });
  //     throw new InternalServerErrorException('Error eliminando');
  //   }
  // }
}
