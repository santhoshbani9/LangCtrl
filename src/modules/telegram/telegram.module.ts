import { ENV_VARS, ENV_VARS_DEFAULTS, QUEUE_NAMES } from '@/constants';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TelegramCoreModule } from './core';
import { Module } from '@nestjs/common';
import { session } from 'telegraf';

import {
  GreeterModule,
  HelperModule,
  ReportModule,
  TunerModule,
} from './scenes';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        token: cfg.get<string>(
          ENV_VARS.TELEGRAM_BOT_TOKEN,
          String(ENV_VARS_DEFAULTS[ENV_VARS.TELEGRAM_BOT_TOKEN]),
        ),
        middlewares: [session()],
        include: [
          TelegramCoreModule,
          GreeterModule,
          TunerModule,
          ReportModule,
          HelperModule,
        ],
      }),
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.TELEGRAM_QUEUE,
    }),
    TelegramCoreModule,
    GreeterModule,
    HelperModule,
    ReportModule,
    TunerModule,
  ],
})
export class TelegramModule {}
