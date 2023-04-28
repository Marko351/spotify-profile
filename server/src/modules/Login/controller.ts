import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response, NextFunction } from 'express';
import querystring from 'querystring';
import { BaseController } from '@libraries/base-controller.libraries';
import { generateRandomString } from '@helpers/generate-random-string.helpers';

class Login extends BaseController {
  constructor() {
    super('login-controller');
  }

  public login(req: Request, res: Response) {
    const scope =
      'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    const state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);

    this.logger.info(
      'ovde sam',
      JSON.stringify(
        querystring.stringify({
          response_type: 'code',
          client_id: this.config.SP_CLIENT_ID,
          scope: scope,
          redirect_uri: this.config.REDIRECT_URI,
          state: state
        })
      )
    );
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: this.config.SP_CLIENT_ID,
        scope: scope,
        redirect_uri: this.config.REDIRECT_URI,
        state: state
      })}`
    );
  }

  public async spotifyCallback(req: Request, res: Response) {
    console.log('OVDE SAM');
    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

    if (!state || state !== storedState) {
      return res.redirect(`${this.config.FRONTEND_URI}/error-page?${querystring.stringify({ error: true, message: 'state mismatch' })}`);
    }
    res.clearCookie('spotify_auth_state');

    const authOptions: AxiosRequestConfig<any> = {
      url: 'https://accounts.spotify.com/api/token',
      data: {
        code: code,
        redirect_uri: this.config.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: `Basic  + ${Buffer.from(this.config.SP_CLIENT_ID + ':' + this.config.SP_CLIENT_SECRET).toString('base64')}`
      }
    };
    try {
      const response = await axios(authOptions);

      console.log(response);
      return res.redirect(`${this.config.FRONTEND_URI}}`);
    } catch (err) {
      return res.redirect(`${this.config.FRONTEND_URI}/error-page?${querystring.stringify({ error: true, message: 'invalid token' })}`);
    }
  }
}

export const login: Login = new Login();
