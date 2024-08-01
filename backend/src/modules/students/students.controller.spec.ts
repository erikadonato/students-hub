import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { SaveStudentDto } from './dto/saveStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomCpf = faker.string.numeric({ length: 11 });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            searchStudentByParams: jest.fn(),
            saveStudent: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findStudent', () => {
    it('should call StudentsService.searchStudentByParams with the correct id', async () => {
      const id = '1';
      const student = {
        id,
        nome: randomName,
        email: randomEmail,
        cpf: null,
      };
      const response = {
        statusCode: 200,
        message: 'Success in the search for the student',
        data: [student],
      };
      jest.spyOn(service, 'searchStudentByParams').mockResolvedValue(response);

      const result = await controller.findStudent(student);

      expect(service.searchStudentByParams).toHaveBeenCalledWith(student);
      expect(result).toEqual(response);
    });
  });

  describe('saveStudent', () => {
    it('should call StudentsService.saveStudent with the correct data and return the response', async () => {
      const saveStudentDto: SaveStudentDto = {
        nome: randomName,
        cpf: randomCpf,
        email: randomEmail,
      };
      const response = {
        statusCode: 200,
        message: 'Successfully created student',
        id: '1',
      };
      jest.spyOn(service, 'saveStudent').mockResolvedValue(response);

      const result = await controller.saveStudent(saveStudentDto);

      expect(service.saveStudent).toHaveBeenCalledWith(saveStudentDto);
      expect(result).toEqual(response);
    });

    it('should throw an InternalServerErrorException if the service throws an error', async () => {
      const saveStudentDto: SaveStudentDto = {
        nome: randomName,
        email: randomEmail,
        cpf: randomCpf,
      };
      jest.spyOn(service, 'saveStudent').mockImplementation(() => {
        throw new InternalServerErrorException('Error while saving student');
      });

      try {
        await controller.saveStudent(saveStudentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Error while saving student');
      }
    });
  });

  describe('update', () => {
    it('should call StudentsService.updateStudent with the correct data', async () => {
      const updateStudentDto: UpdateStudentDto = {
        id: '1',
        nome: randomName,
        email: randomEmail,
        cpf: randomCpf,
      };
      const response = {
        statusCode: 200,
        message: 'Student updated successfully',
      };
      jest.spyOn(service, 'updateStudent').mockResolvedValue(response);

      const result = await controller.updateStudent(updateStudentDto);

      expect(service.updateStudent).toHaveBeenCalledWith(updateStudentDto);
      expect(result).toEqual(response);
    });
  });

  describe('deleteStudent', () => {
    it('should call StudentsService.deleteStudent with the correct id', async () => {
      const id = '1';
      const response = {
        statusCode: 200,
        message: 'Student deleted successfully',
      };
      jest.spyOn(service, 'deleteStudent').mockResolvedValue(response);

      const result = await controller.deleteStudent(id);

      expect(service.deleteStudent).toHaveBeenCalledWith(id);
      expect(result).toEqual(response);
    });
  });
});
