import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.taskService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:projectId')
  async create(
    @Param('projectId', ParseIntPipe) id: number,
    @Body() body: TaskDto,
  ): Promise<unknown> {
    return this.taskService.create(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Task,
  ): Promise<unknown> {
    return this.taskService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.taskService.delete(id);
  }
}
