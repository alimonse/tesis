import {IsNumber, IsOptional, IsString} from "class-validator";

export class HorarioHoraActualizarDto {

  @IsOptional()
  @IsString()
  desde: string;

  @IsOptional()
  @IsString()
  hasta: string;

  @IsOptional()
  @IsNumber()
  habilitado: 1 | 0;

}
