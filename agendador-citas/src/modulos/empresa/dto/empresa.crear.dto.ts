import {IsNumber, IsNotEmpty, IsString, IsOptional} from 'class-validator';
import { Expose } from 'class-transformer';

export class EmpresaCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  nombreComercial: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  ruc: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  mensajeSaludo: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  informacion: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  lat: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  lng: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
