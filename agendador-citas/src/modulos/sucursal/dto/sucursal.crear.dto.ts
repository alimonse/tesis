import {IsNumber, IsNotEmpty, IsString, IsOptional} from 'class-validator';
import { Expose } from 'class-transformer';

export class SucursalCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  nombreSucursal: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  correo: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  tipoEmpresa: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
