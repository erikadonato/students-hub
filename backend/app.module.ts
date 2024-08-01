import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { StudentsModule } from 'src/modules/students/students.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, StudentsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
