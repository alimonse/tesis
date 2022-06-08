import {IsNumber, IsOptional, IsString} from "class-validator";

export class UsuarioCrearDto {

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  telefono: string;

  @IsOptional()
  @IsNumber()
  habilitado: 1 | 0;
}
