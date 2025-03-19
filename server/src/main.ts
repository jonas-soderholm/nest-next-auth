import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();

  app.enableCors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & authentication headers
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
