import { Injectable } from '@nestjs/common';
import { HashBase64Util } from '../common/utils/hash-base64.util';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

import { LogonException } from './exceptions/logon.exception';
import type { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(login: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findByLogin(login);
    if (!user) throw new LogonException('User not found');

    const pswdCripto = await HashBase64Util.hashData(password, user.salt);
    if (user.password !== pswdCripto) throw new LogonException('Invalid pswd');

    const payload: JwtPayload = {
      // audience: 'xxx',
      // jti: 'xxx',
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
