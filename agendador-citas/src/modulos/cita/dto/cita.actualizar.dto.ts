import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CitaActualizarDto {
  @IsString()
  @IsOptional()
  @Expose()
  calendarId: string;

  @IsString()
  @IsOptional()
  @Expose()
  descripcion: string;

  @IsString()
  @IsOptional()
  @Expose()
  dia: string;

  @IsString()
  @IsOptional()
  @Expose()
  horaInicio: string;

  @IsString()
  @IsOptional()
  @Expose()
  horaFin: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  habilitado: 0 | 1;
}
