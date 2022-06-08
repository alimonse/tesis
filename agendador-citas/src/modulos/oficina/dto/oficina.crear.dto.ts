import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class OficinaCrearDto {
  @IsOptional()
  @IsString()
  @Expose()
  nombreOficina: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: number;
}
