import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentEntity } from './entities/student.entity';

@Module({
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentsController],
})
export class StudentsModule {}
