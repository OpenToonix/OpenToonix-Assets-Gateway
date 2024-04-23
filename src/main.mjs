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

app.set('view engine', 'ejs');

app.use(logger);

app.use('/', express.static(resolve('public')));

app.get('/', async (req, res) => {
  let languageConfig = null;

  const language = req.query.lang || 'en';
  const templateParameters = {
    authentication: null,
    avatar: '',
    cdnPath: process.env.CDN_PATH,
    httpServerAddress: process.env.HTTP_SERVER_ADDRESS,
    lang: language,
    searcherPlaceholder: '',
    title: '',
    wantToCreateMyToonix: '',
    welcomeForeigner: ''
  };

  try {
    languageConfig = (await import(`./config/i18n/${language}.mjs`)).default;
  } catch (error) {
    ConsoleLogger.getLogger('main').error(error);

    languageConfig = (await import('./config/i18n/en.mjs')).default;

    templateParameters.lang = 'en';
  }

  if (!templateParameters.lang) templateParameters.lang = language;

  res.render('index', {
    ...templateParameters,
    authentication: languageConfig.authentication,
    avatar: languageConfig.mainPage.avatar,
    searcherPlaceholder: languageConfig.mainPage.search,
    title: languageConfig.mainPage.title,
    wantToCreateMyToonix: languageConfig.authentication.wantToCreateMyToonix,
    welcomeForeigner: languageConfig.authentication.welcomeForeigner
  });
});

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
