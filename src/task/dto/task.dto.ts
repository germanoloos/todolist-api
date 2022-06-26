import { IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  finishedAt: Date;

  @IsOptional()
  done: boolean;
}
