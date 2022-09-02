import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UsuarioCrearDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  telefono: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
