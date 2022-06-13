import {IsOptional, IsString} from "class-validator";
import {Column} from "typeorm";
import {Expose} from "class-transformer";

export class HorarioHoraCrearDto {

  @IsOptional()
  @IsString()
  @Expose()
  desde: string;

  @IsOptional()
  @IsString()
  @Expose()
  hasta: string;

  @IsOptional()
  @IsString()
  @Expose()
  habilitado: 1 | 0;

}
