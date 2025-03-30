import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for all routes
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allow specific headers
    credentials: true, // Allow credentials
    maxAge: 3600, // Cache preflight response for 1 hour
    optionsSuccessStatus: 200, // Response status for successful OPTIONS requests
  });

  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  app.enableShutdownHooks(); // Enable shutdown hooks for graceful shutdown

  await app.listen(envs.PORT || 3000);
}
bootstrap();
