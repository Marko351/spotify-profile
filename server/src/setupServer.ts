import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import { Server } from 'socket.io';
import Logger from 'bunyan';

import applicationRoutes from '@root/routes';
import { config } from '@root/config';
import { CustomError, IErrorResponse } from '@globals/helpers/error-handler.helpers';
import { HTTP_STATUS } from '@globals/constants/http-statuses.constants';

const SERVER_PORT = 3006;
const log: Logger = config.createLogger('server');

export class SpotifyProfileServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.COOKIE_SECRET_KEY_ONE!, config.COOKIE_SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routeMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', async (req: Request, res: Response) => {
      res.status(HTTP_STATUS.HTTP_NOT_FOUND).json({ message: `${req.originalUrl} not found!` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      // this.socketIOConnections(socketIO);
    } catch (err) {
      log.error(err);
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });

    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started wirh process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on port ${SERVER_PORT}`);
    });
  }

  // private socketIOConnections(io: Server): void {
  //   const postSocketHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
  //   const followerSocketHandler: SocketIOFollowerHandler = new SocketIOFollowerHandler(io);
  //   const userSocketHandler: SocketIOUserHandler = new SocketIOUserHandler(io);
  //   const notificationSocketHandler: SocketIONotificationHandler = new SocketIONotificationHandler();

  //   postSocketHandler.listen();
  //   followerSocketHandler.listen();
  //   userSocketHandler.listen();
  //   notificationSocketHandler.listen(io);
  // }
}
