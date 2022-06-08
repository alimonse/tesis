import {IsNumber, IsOptional, IsString} from "class-validator";

export class HorarioDiaCrearDto {

  @IsOptional()
  @IsString()
  dia: string;

  @IsOptional()
  @IsNumber()
  habilitado: 1 | 0;

}
