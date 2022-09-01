import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EmpresaActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  nombreComercial: string;

  @IsOptional()
  @IsString()
  @Expose()
  mensajeSaludo: string;

  @IsOptional()
  @IsString()
  @Expose()
  informacion: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  lat: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  lng: string;

  @IsOptional()
  @IsString()
  @Expose()
  ruc: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
