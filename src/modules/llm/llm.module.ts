import { LlmService } from './llm.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [LlmService],
})
export class LlmModule { }
