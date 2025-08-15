import { INestApplication } from "@nestjs/common";
import { Logger } from "./logger";

export const gracefulShutdown = async (app: INestApplication, signal: string) => {
  const logger = Logger.getInstance();

  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  try {
    await app.close();

    logger.info('Graceful shutdown complete.');

    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Error during graceful shutdown');

    process.exit(1);
  }
}
