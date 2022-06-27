import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomHttpException } from '../common/exceptions/custom-http.exception';
import { ProjectService } from '../project/project.service';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectService, //
  ) {}

  async findById(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(projectId: number, task: Partial<Task>): Promise<number> {
    const prj = await this.projectService.findById(projectId);
    const tsk = new Task();
    tsk.project = prj;
    tsk.description = task.description;
    tsk.createdAt = new Date();
    const result = await this.taskRepository.insert(tsk);
    return result.identifiers[0] as unknown as number;
  }

  async update(id: number, task: Partial<Task>): Promise<unknown> {
    const _task = await this.findById(id);
    if (_task.done) {
      throw new CustomHttpException(
        'Action not allowed',
        HttpStatus.BAD_REQUEST,
        new Error('Action not allowed'),
      );
    }

    if (!_task.done && task.done) {
      _task.finishedAt = new Date();
    }
    _task.done = task.done;
    _task.description = task.description;
    await this.taskRepository.update({ id }, _task);
    return _task;
  }

  async delete(id: number): Promise<void> {
    const _task = await this.findById(id);
    if (_task.done) {
      throw new CustomHttpException(
        'Action not allowed',
        HttpStatus.BAD_REQUEST,
        new Error('Action not allowed'),
      );
    }
    await this.taskRepository.delete({ id });
  }
}
