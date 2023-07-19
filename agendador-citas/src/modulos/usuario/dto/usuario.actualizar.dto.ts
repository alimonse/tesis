import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UsuarioActualizarDto {
  @IsString()
  @IsOptional()
  @Expose()
  nombre: string;

  @IsString()
  @IsOptional()
  @Expose()
  telefono: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 1 | 0;
}
