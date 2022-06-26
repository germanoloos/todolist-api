import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
