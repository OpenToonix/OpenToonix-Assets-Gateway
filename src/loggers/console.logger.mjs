import { config, createLogger, format, transports } from 'winston';

const { colorize, combine, errors, label, printf, timestamp } = format;
const customFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} ${level} [${label}]: ${message}`
);

export class ConsoleLogger {
  constructor() {
    throw new Error(
      'ConsoleLogger is a static class and cannot be instantiated'
    );
  }

  /**
   * @param {string} context - The context of the logger
   */
  static getLogger(context) {
    return createLogger({
      format: combine(
        colorize({
          all: true
        }),
        errors({ stack: false }),
        label({ label: context }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
      ),
      levels: config.cli.levels,
      transports: [new transports.Console()]
    });
  }
}
