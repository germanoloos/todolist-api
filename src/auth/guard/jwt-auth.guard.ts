import { Injectable } from '@nestjs/common';
// --->  I'm not using passport pre-existing modules to authentication, only for JWT Generation/Validation
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
