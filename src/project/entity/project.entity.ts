import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];
}
