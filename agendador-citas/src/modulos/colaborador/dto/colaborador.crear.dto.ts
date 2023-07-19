import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { Expose } from 'class-transformer';

export class ColaboradorCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  nombreColaborador: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  correo: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
