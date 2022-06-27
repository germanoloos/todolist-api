import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../config/auth.config';

// --->  I'm not using passport pre-existing modules to authentication, only for JWT Generation/Validation
import { PassportStrategy } from '@nestjs/passport';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<unknown> {
    // TODO: Implement validation logic (if any)
    // TODO: Return the user data that will be added to the request (req.user)
    return { id: payload.sub };
  }
}
