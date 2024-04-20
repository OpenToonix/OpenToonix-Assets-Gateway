import { ConsoleLogger } from '../loggers/console.logger.mjs';

export function logger(request, response, next) {
  const consoleLogger = ConsoleLogger.getLogger(logger.name);

  consoleLogger.info(
    `Request received: ${request.method} ${request.originalUrl} from ${request.ip}`
  );

  next();
}
