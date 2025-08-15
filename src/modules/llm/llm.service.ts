import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LLMService {
  private readonly logger: Logger = new Logger(LLMService.name);

  constructor() {}
}
