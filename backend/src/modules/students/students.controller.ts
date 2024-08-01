import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { SaveStudentDto } from './dto/saveStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { SearchStudentDto } from './dto/searchStudent.dto';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('search')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findStudent(
    @Query()
    query: SearchStudentDto,
  ) {
    if (!query) {
      throw new BadRequestException(
        'Please provide at least one search parameter: id, nome, cpf, or email',
      );
    }
    return this.studentsService.searchStudentByParams(query);
  }

  @Post('save')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  saveStudent(@Body() saveStudentDto: SaveStudentDto) {
    return this.studentsService.saveStudent(saveStudentDto);
  }

  @Patch('update')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateStudent(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateStudent(updateStudentDto);
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  deleteStudent(@Query('id') id: string) {
    return this.studentsService.deleteStudent(id);
  }
}
