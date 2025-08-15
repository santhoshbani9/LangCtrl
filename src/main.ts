import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { gracefulShutdown, Logger } from '@/utils';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const loggerInstance = Logger.getInstance();

  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    moduleIdGeneratorAlgorithm: 'deep-hash',
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  process.on('SIGINT', () => void gracefulShutdown(app, 'SIGINT'));
  process.on('SIGTERM', () => void gracefulShutdown(app, 'SIGTERM'));

  try {
    await app.listen(process.env.PORT ?? 3000);

    loggerInstance.info(
      { url: await app.getUrl() },
      `Application is running on:`,
    );
  } catch (error) {
    loggerInstance.error(`Error during application bootstrap: ${error}`);
  }
};

void bootstrap().catch(console.error);
