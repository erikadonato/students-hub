import { IsNotEmpty, IsString } from 'class-validator';

export class SaveStudentDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
