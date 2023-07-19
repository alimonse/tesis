import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SucursalActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  nombreSucursal: string;

  @IsOptional()
  @IsString()
  @Expose()
  direccion: string;

  @IsOptional()
  @IsString()
  @Expose()
  telefono: string;

  @IsOptional()
  @IsString()
  @Expose()
  correo: string;

  @IsOptional()
  @IsString()
  @Expose()
  tipoEmpresa: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
