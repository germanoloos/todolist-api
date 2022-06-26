import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findById(id: number): Promise<Project> {
    return this.projectsRepository.findOneBy({ id });
  }

  async create(user: User, project: Partial<Project>): Promise<number> {
    const prj = new Project();
    prj.name = project.name;
    prj.user = user;
    const result = await this.projectsRepository.insert(prj);
    return result.identifiers[0] as unknown as number;
  }

  async update(id: number, project: Project): Promise<void> {
    await this.projectsRepository.update({ id }, project);
  }

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete({ id });
  }
}
