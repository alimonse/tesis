import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ColaboradorActualizarDto {
  @IsOptional()
  @IsString()
  @Expose()
  nombreColaborador: string;

  @IsOptional()
  @IsString()
  @Expose()
  correo: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
