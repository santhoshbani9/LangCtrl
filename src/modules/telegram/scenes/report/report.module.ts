import { Module } from '@nestjs/common';
import { ReportWizard } from './report.wizard';

@Module({
  providers: [ReportWizard],
})
export class ReportModule {}
