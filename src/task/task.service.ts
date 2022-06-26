import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update(id: number, task: Partial<Task>): Promise<void> {
    await this.taskRepository.update({ id }, task);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete({ id });
  }
}