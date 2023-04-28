import { Router } from 'express';
import { login } from './controller';

const loginRouter = Router();

loginRouter.get('/', login.login.bind(login));
loginRouter.get('/callback', login.spotifyCallback.bind(login));

export { loginRouter };
