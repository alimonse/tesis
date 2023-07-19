import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class HorarioDiaActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  dia: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
