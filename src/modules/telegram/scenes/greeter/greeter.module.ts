import { OllamaInstallerModule } from '../../ollama-installer';
import { GreeterWizard } from './greeter.wizard';
import { Module } from '@nestjs/common';

@Module({
  imports: [OllamaInstallerModule],
  providers: [GreeterWizard],
})
export class GreeterModule {}
