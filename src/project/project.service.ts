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

  async getAll(user: User): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { user: user },
      relations: ['tasks'],
    });
  }

  async findById(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async create(user: User, project: Partial<Project>): Promise<Project> {
    const prj = new Project();
    prj.name = project.name;
    prj.user = user;
    const result = await this.projectsRepository.insert(prj);
    prj.id = result.identifiers[0] as unknown as number;
    return prj;
  }

  async update(id: number, project: Project): Promise<void> {
    const _project = await this.projectsRepository.findOneBy({ id });
    project.name = project.name;
    await this.projectsRepository.update({ id }, _project);
  }

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete({ id });
  }
}
