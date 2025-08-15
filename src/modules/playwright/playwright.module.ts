import { QUEUE_NAMES } from "@/constants";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.PLAYWRIGHT_QUEUE,
    }),
  ]
})
export class PlaywrightModule { }
