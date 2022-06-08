import {IsNumber, IsOptional, IsString} from "class-validator";

export class HorarioDiaActualizarDto {

  @IsOptional()
  @IsString()
  dia: string;

  @IsOptional()
  @IsNumber()
  habilitado: 1 | 0;

}
