import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
