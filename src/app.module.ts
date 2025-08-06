import { ScreenshotterModule } from './modules/screenshotter/screenshotter.module';
import { TaskManagerModule } from './modules/task-manager/task-manager.module';
import { ArchiverModule } from './modules/archiver/archiver.module';
import { ReporterModule } from './modules/reporter/reporter.module';
import { BrowserModule } from './modules/browser/browser.module';
import { AgentModule } from './modules/agent/agent.module';
import { AppController } from './app.controller';
import { LlmModule } from './modules/llm/llm.module';
import { DomModule } from './modules/dom/dom.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ArchiverModule, BrowserModule, LlmModule, ScreenshotterModule, AgentModule, DomModule, ReporterModule, TaskManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
