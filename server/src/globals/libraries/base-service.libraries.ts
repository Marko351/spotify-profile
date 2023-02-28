import { config } from '@root/config';

export class BaseService {
  readonly config;

  constructor() {
    this.config = config;
  }
}
