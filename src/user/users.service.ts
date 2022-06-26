import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashBase64Util } from 'src/common/utils/hash-base64.util';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByLogin(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<number> {
    const userAux = new User();
    userAux.email = user.email;
    userAux.name = user.name;
    userAux.salt = HashBase64Util.generateSalt();
    userAux.password = await HashBase64Util.hashData(
      user.password,
      userAux.salt,
    );
    const result = await this.usersRepository.insert(userAux);
    return result.identifiers[0] as unknown as number;
  }

  async update(user: Partial<User>): Promise<void> {
    await this.usersRepository.update({ id: user.id }, user);
  }
}
