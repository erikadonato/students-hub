import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  email: string;
}
