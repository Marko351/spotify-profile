import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public COOKIE_SECRET_KEY_ONE: string | undefined;
  public COOKIE_SECRET_KEY_TWO: string | undefined;
  public SP_CLIENT_ID: string | undefined;
  public SP_CLIENT_SECRET: string | undefined;
  public REDIRECT_URI: string | undefined;
  public FRONTEND_URI: string | undefined;

  constructor() {
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.COOKIE_SECRET_KEY_ONE = process.env.COOKIE_SECRET_KEY_ONE;
    this.COOKIE_SECRET_KEY_TWO = process.env.COOKIE_SECRET_KEY_TWO;
    this.SP_CLIENT_ID = process.env.SP_CLIENT_ID;
    this.SP_CLIENT_SECRET = process.env.SP_CLIENT_SECRET;
    this.REDIRECT_URI = process.env.REDIRECT_URI;
    this.FRONTEND_URI = process.env.FRONTEND_URI;
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
