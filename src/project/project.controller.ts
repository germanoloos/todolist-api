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
import { ReqUser } from '../common/decorators/req-user.decorator';
import { User } from '../user/entity/user.entity';
import { ProjectDto } from './dto/project.dto';
import { Project } from './entity/project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll(@ReqUser() user: User): Promise<unknown> {
    return this.projectService.getAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.projectService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: ProjectDto,
    @ReqUser() user: User,
  ): Promise<unknown> {
    return this.projectService.create(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Project,
  ): Promise<unknown> {
    return this.projectService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.projectService.delete(id);
  }
}
