import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:4200/', 'https://todolist-web-eta.vercel.app'],
  });
  console.log('AppModule started');

  await app.listen(process.env.PORT);
}
bootstrap();
