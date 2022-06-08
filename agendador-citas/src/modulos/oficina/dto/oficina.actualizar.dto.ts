import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class OficinaActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  nombreOficina: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: number;
}
