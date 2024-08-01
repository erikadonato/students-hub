import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { StudentEntity } from 'src/modules/students/entities/student.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'dbStudents',
      entities: [StudentEntity],
      synchronize: true,
    };
  }
}
