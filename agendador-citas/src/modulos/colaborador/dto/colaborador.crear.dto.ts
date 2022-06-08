import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ColaboradorCrearDto {
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
