import { IsOptional, IsString } from 'class-validator';

export class SearchStudentDto {
  @IsOptional()
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
