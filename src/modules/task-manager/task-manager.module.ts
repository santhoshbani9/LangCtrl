import { TaskManagerService } from './task-manager.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [TaskManagerService],
})
export class TaskManagerModule { }
