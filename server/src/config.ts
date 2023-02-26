import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public COOKIE_SECRET_KEY_ONE: string | undefined;
  public COOKIE_SECRET_KEY_TWO: string | undefined;

  constructor() {
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.COOKIE_SECRET_KEY_ONE = process.env.COOKIE_SECRET_KEY_ONE;
    this.COOKIE_SECRET_KEY_TWO = process.env.COOKIE_SECRET_KEY_TWO;
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug', serializers: { req: bunyan.stdSerializers.req } });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

  // public cloudinaryConfig(): void {
  //   cloudinary.v2.config({
  //     cloud_name: this.CLOUD_NAME,
  //     api_key: this.CLOUD_API_KEY,
  //     api_secret: this.CLOUD_API_SECRET
  //   });
  // }
}

export const config: Config = new Config();
