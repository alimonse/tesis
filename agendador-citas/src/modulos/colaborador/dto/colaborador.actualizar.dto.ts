import { IsOptional, IsString } from 'class-validator';
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
  @IsString()
  @Expose()
  habilitado: number;
}
