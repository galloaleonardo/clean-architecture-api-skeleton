import pino, { Logger } from 'pino';

export class AppLogger {
  private logger: Logger;

  constructor() {
    this.logger = pino({
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
    });
  }

  public info(value: string | unknown) {
    this.logger.info(value);
  }

  public debug(value: string | unknown) {
    this.logger.debug(value);
  }

  public warn(value: string | unknown) {
    this.logger.warn(value);
  }

  public error(value: string | unknown) {
    this.logger.error(value);
  }
}
