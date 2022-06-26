import { registerAs } from '@nestjs/config';

export default registerAs('auth-config', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
}));
