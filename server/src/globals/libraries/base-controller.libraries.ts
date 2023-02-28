import { config } from '@root/config';

export class BaseController {
  public readonly config;
  public readonly logger;

  constructor(loggerName: string) {
    this.config = config;
    this.logger = config.createLogger(loggerName);
  }
}
