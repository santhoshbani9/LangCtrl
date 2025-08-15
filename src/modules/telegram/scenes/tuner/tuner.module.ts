import { TunerWizard } from './tuner.wizard';
import { Module } from '@nestjs/common';

@Module({
  providers: [TunerWizard],
})
export class TunerModule {}
