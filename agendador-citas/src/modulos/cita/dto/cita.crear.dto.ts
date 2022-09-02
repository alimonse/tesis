import {IsNumber, IsNotEmpty, IsString, IsOptional} from 'class-validator';
import { Expose } from 'class-transformer';

export class CitaCrearDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  dia: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  horaFin: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  habilitado: 0 | 1;
}
