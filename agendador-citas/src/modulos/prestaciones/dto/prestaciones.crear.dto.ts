import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class PrestacionesCrearDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  nombreServicio: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  tiempoAproximado: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  tiempoEspera: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  habilitado: 0 | 1;
}
