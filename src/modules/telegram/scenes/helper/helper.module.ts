import { HelperWizard } from './helper.wizard';
import { Module } from '@nestjs/common';

@Module({
  providers: [HelperWizard],
})
export class HelperModule {}
