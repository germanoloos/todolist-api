import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CustomHttpException } from '../common/exceptions/custom-http.exception';

import { AuthService } from './auth.service';
import { LogonDto } from './dto/logon.dto';
import { LogonException } from './exceptions/logon.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LogonDto): Promise<unknown> {
    try {
      const result = await this.authService.login(body.email, body.password);
      return result;
    } catch (error) {
      if (error instanceof LogonException) {
        throw new CustomHttpException(
          'Invalid email /or password ',
          HttpStatus.BAD_REQUEST,
          error,
        );
      }

      throw error;
    }
  }
}
