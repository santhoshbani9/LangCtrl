import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor<unknown, unknown> {
  private readonly logger: Logger = new Logger(ResponseTimeInterceptor.name);

  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    this.logger.log('Before...');

    const start = Date.now();

    this.logger.debug(`Execution started at: ${start}`);

    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Response time: ${Date.now() - start}ms`)),
      );
  }
}
