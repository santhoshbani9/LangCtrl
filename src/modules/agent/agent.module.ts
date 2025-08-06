import { AgentService } from './agent.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [AgentService],
})
export class AgentModule { }
