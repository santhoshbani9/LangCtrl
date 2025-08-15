import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PlaywrightService {
  private readonly logger: Logger = new Logger(PlaywrightService.name);

  constructor() { }
}
