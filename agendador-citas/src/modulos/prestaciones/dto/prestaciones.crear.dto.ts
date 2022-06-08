import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class PrestacionesCrearDto {
  @IsOptional()
  @IsString()
  @Expose()
  servicio: string;

  @IsOptional()
  @IsString()
  @Expose()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: number;
}
