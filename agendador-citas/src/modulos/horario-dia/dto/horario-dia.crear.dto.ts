import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { Expose } from 'class-transformer';

export class HorarioDiaCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  dia: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
