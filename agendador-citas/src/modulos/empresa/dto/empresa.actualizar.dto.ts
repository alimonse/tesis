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
  ruc: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
