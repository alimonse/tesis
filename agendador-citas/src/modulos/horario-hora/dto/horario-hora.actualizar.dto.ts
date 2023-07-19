import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class HorarioHoraActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  desde: string;

  @IsOptional()
  @IsString()
  @Expose()
  hasta: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
