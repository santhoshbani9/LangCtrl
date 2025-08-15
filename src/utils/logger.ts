import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { cwd } from 'process';
import { join } from 'path';
import pino, { TransportTargetOptions } from 'pino';

const transport = pino.transport({
  targets: [
    {
      level: 'trace',
      target: 'pino/file',
      options: {
        destination: join(cwd(), 'logs', 'trace.log'),
      },
    },
    {
      level: 'debug',
      target: 'pino/file',
      options: {
        destination: join(cwd(), 'logs', 'debug.log'),
      },
    },
    {
      level: 'info',
      target: 'pino/file',
      options: {
        destination: join(cwd(), 'logs', 'info.log'),
      },
    },
    {
      level: 'warn',
      target: 'pino/file',
      options: {
        destination: join(cwd(), 'logs', 'warn.log'),
      },
    },
    {
      level: 'error',
      target: 'pino/file',
      options: {
        destination: join(cwd(), 'logs', 'error.log'),
      },
    },
    {
      level: 'info',
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  ],
});

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    formatters: {
      level(label: string) {
        return { level: label.toUpperCase() };
      },
    },
    base: { pid: process.pid },
  },
  undefined, // second parameter for destination
);

export class Logger extends ConsoleLogger implements LoggerService {
  private static instance: pino.Logger;

  constructor() {
    super();
  }

  public static getInstance(): pino.Logger {
    if (!Logger.instance) {
      Logger.instance = logger;
    }
    return Logger.instance;
  }

  public log(message: string): void {
    logger.info(message);
  }

  public error(message: string): void {
    logger.error(message);
  }

  public warn(message: string): void {
    logger.warn(message);
  }

  public debug(message: string): void {
    logger.debug(message);
  }

  public verbose(message: string): void {
    logger.trace(message);
  }
}
