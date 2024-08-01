import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';
import { SaveStudentDto } from './dto/saveStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { SearchStudentDto } from './dto/searchStudent.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>,
  ) {}

  async searchStudentByParams(params: SearchStudentDto) {
    const validParams = this.checkValidParams(params);

    if (!validParams) {
      const results = await this.repository.find();
      return {
        statusCode: 200,
        message: `Success listing all students`,
        data: results,
      };
    }

    const result = await this.repository.find({
      where: validParams,
    });

    if (!result || result.length === 0) {
      throw new NotFoundException(
        `Student with ${JSON.stringify(validParams)} not found`,
      );
    }

    const studentsResult = result.length === 1 ? 'student' : 'students';

    return {
      statusCode: 200,
      message: `Success in the search for ${studentsResult}`,
      data: result,
    };
  }

  async saveStudent({ nome, email, cpf }: SaveStudentDto) {
    try {
      const createStudent = this.repository.create({
        nome,
        email,
        cpf,
      });
      const { id } = await this.repository.save(createStudent);
      return { statusCode: 200, message: 'Successfully created student', id };
    } catch (error) {
      throw new InternalServerErrorException('Error while saving student');
    }
  }

  async updateStudent(params: UpdateStudentDto) {
    const { id, nome, email, cpf } = params;
    const student = await this.repository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with id ${id} not found in database`,
      );
    }

    try {
      await this.repository.update(
        { id },
        {
          nome,
          email,
          cpf,
        },
      );
      return {
        statusCode: 200,
        message: 'Student updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error while updating student');
    }
  }

  async deleteStudent(id: string) {
    const student = await this.repository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    try {
      await this.repository.remove(student);
      return { statusCode: 200, message: 'Student deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting student');
    }
  }

  private checkValidParams(params: SearchStudentDto) {
    return Object.entries(params).reduce(
      (validParams, [key, value]) => {
        if (value !== null && value !== undefined) {
          validParams[key] = value;
        }
        return validParams;
      },
      {} as { [key: string]: string },
    );
  }
}
