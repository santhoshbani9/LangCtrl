import { TelegramCoreService } from './telegram-core.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TelegramCoreService],
  exports: [TelegramCoreService],
})
export class TelegramCoreModule {}
