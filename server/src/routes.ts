import { Application } from 'express';

import { loginRouter } from '@login/routes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    // app.use('/queues', serverAdapter.getRouter());
    app.use(`${BASE_PATH}/login`, loginRouter);
  };
  routes();
};
