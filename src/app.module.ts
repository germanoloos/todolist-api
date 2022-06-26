import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { Project } from './project/entity/project.entity';
import { ProjectModule } from './project/project.module';
import { Task } from './task/entity/task.entity';
import { TaskModule } from './task/task.module';
import { User } from './user/entity/user.entity';
import { UsersModule } from './user/users.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Project, Task],
      synchronize: true,
      ssl: true,
    }),
    UsersModule,
    AuthModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          stopAtFirstError: true,
          whitelist: true,
        }),
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
