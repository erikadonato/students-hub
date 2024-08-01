import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';

const mockStudentRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: jest.Mocked<Repository<StudentEntity>>;

  const randomName = faker.person.fullName();

  const studentWithoutId = {
    nome: randomName,
    email: faker.internet.email(),
    cpf: faker.string.numeric({ length: 11 }),
  };

  const studentWithId = {
    id: '1',
    ...studentWithoutId,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(StudentEntity),
          useFactory: mockStudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    ) as jest.Mocked<Repository<StudentEntity>>;
  });

  describe('searchStudentByParams', () => {
    it('should return a student if found', async () => {
      const params = { nome: randomName };

      repository.find.mockResolvedValue([studentWithId]);

      const result = await service.searchStudentByParams({
        ...params,
        email: '',
        cpf: '',
        id: '',
      });
      expect(result).toEqual({
        statusCode: 200,
        message: 'Success in the search for student',
        data: [studentWithId],
      });
    });

    it('should return all students', async () => {
      repository.find.mockResolvedValue([studentWithId]);

      const result = await service.searchStudentByParams({
        nome: undefined,
        email: undefined,
        cpf: undefined,
        id: undefined,
      });
      expect(result).toEqual({
        statusCode: 200,
        message: 'Success listing all students',
        data: [studentWithId],
      });
    });

    it('should throw a NotFoundException if student is not found', async () => {
      const params = { nome: randomName };

      repository.findOne.mockResolvedValue(null);

      await expect(
        service.searchStudentByParams({
          ...params,
          email: '',
          cpf: '',
          id: '',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('saveStudent', () => {
    it('should save a student and return success message', async () => {
      repository.create.mockReturnValue(studentWithoutId as any);
      repository.save.mockResolvedValue(studentWithId);

      const result = await service.saveStudent(studentWithoutId);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Successfully created student',
        id: '1',
      });
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      repository.create.mockReturnValue(studentWithoutId as any);
      repository.save.mockRejectedValue(new Error('Error'));

      await expect(service.saveStudent(studentWithoutId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateStudent', () => {
    it('should update a student and return success message', async () => {
      repository.findOne.mockResolvedValue(studentWithId);
      repository.update.mockResolvedValue(null);

      const result = await service.updateStudent(studentWithId);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Student updated successfully',
      });
    });

    it('should throw a NotFoundException if student is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.updateStudent(studentWithId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      repository.findOne.mockResolvedValue(studentWithId);
      repository.update.mockRejectedValue(new Error('Error'));

      await expect(service.updateStudent(studentWithId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student and return success message', async () => {
      repository.findOne.mockResolvedValue(studentWithId);
      repository.remove.mockResolvedValue(null);

      const result = await service.deleteStudent('1');
      expect(result).toEqual({
        statusCode: 200,
        message: 'Student deleted successfully',
      });
    });

    it('should throw a NotFoundException if student is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.deleteStudent('1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      repository.findOne.mockResolvedValue(studentWithId);
      repository.remove.mockRejectedValue(new Error('Error'));

      await expect(service.deleteStudent('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
