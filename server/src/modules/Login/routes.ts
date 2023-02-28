import { Router } from 'express';
import { login } from './controller';

const loginRouter = Router();

loginRouter.post('/', login.login.bind(login));
loginRouter.post('/callback', login.spotifyCallback.bind(login));

export { loginRouter };
