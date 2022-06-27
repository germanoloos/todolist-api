import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyPlugin as rTracerPlugin } from 'cls-rtracer';
import { fastifyHelmet as helmetPlugin } from 'fastify-helmet';
import multipartPlugin from 'fastify-multipart';
import hexoid from 'hexoid';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false },
  );
  app.register(helmetPlugin);
  app.register(rTracerPlugin, {
    echoHeader: true,
    requestIdFactory: hexoid(32),
  });
  app.register(multipartPlugin);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
