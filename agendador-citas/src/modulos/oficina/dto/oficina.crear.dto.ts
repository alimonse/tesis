import {IsNumber, IsNotEmpty, IsString, IsOptional} from 'class-validator';
import { Expose } from 'class-transformer';

export class OficinaCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  nombreOficina: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
