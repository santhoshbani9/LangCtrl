import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@langctrl/utils';

const gracefulShutdown = async (app: INestApplication, signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  try {
    await app.close();

    logger.info('Graceful shutdown complete.');

    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);

    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: {
      error: (message) => logger.error(message),
      warn: (message) => logger.warn(message),
      log: (message) => logger.info(message),
      debug: (message) => logger.debug(message),
      fatal: (message) => logger.fatal(message),
      verbose: (message) => logger.silent(message),
    }, bufferLogs: true
  });

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  process.on('SIGINT', () => void gracefulShutdown(app, 'SIGINT'));
  process.on('SIGTERM', () => void gracefulShutdown(app, 'SIGTERM'));
}

void (async () => {
  try {
    await bootstrap();
    logger.info(
      `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  } catch (error) {
    logger.error('Error during application bootstrap:', error);
    process.exit(1);
  }
})();
