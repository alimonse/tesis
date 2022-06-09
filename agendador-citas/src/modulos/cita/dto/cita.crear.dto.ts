import {IsNumber, IsOptional, IsString} from "class-validator";

export class CitaCrearDto {

  @IsString()
  @IsOptional()
  dia: string;

  @IsString()
  @IsOptional()
  horaInicio: string;

  @IsString()
  @IsOptional()
  horaFin: string;

  @IsNumber()
  @IsOptional()
  habilitado: 0 | 1;

}
