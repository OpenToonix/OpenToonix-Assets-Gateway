import { resolve } from 'node:path';

import express from 'express';

import { ConsoleLogger } from './loggers/console.logger.mjs';

import {
  environmentVariablesChecker,
  shouldUseHttps
} from './environment-variables.checker.mjs';

import { logger } from './shared/middlewares/logger.middleware.mjs';

const port = process.env.PORT || 80;

const app = express();
const runningLogBaseMessage = 'Server running on port';

environmentVariablesChecker();

app.disable('x-powered-by');

app.use(logger);

app.use('/', express.static(resolve('public')));

if (shouldUseHttps()) {
  import('node:https')
    .then(({ createServer }) => {
      import('node:fs')
        .then(({ readFileSync }) => {
          const cert = readFileSync(process.env.HTTPS_CERT_FILEPATH);
          const key = readFileSync(process.env.HTTPS_KEY_FILEPATH);

          createServer({ cert, key }, app).listen(port);

          ConsoleLogger.getLogger('main').info(
            `${runningLogBaseMessage} ${port} with HTTPS`
          );
        })
        .catch(error => {
          ConsoleLogger.getLogger('main').error(error);
          throw error;
        });
    })
    .catch(error => {
      ConsoleLogger.getLogger('main').error(error);
      throw error;
    });
} else
  app.listen(port, () => {
    ConsoleLogger.getLogger('main').info(`${runningLogBaseMessage} ${port}`);
  });
