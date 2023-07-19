import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { Expose } from 'class-transformer';

export class HorarioHoraCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  desde: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  hasta: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
