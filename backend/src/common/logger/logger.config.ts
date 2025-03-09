import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor(context?: string) {
    const { combine, timestamp, printf, colorize } = winston.format;

    // Custom log format
    const logFormat = printf(
      ({ level, message, timestamp, context, trace }) => {
        return `${timestamp} [${context || 'Application'}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
      },
    );

    // Define transports
    const transports: winston.transport[] = [
      // Console transport
      new winston.transports.Console({
        format: combine(colorize(), timestamp(), logFormat),
      }),
      // File transport for errors
      new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxSize: '20m',
        maxFiles: '14d',
        format: combine(timestamp(), logFormat),
      }),
      // File transport for all logs
      new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        format: combine(timestamp(), logFormat),
      }),
    ];

    // Create logger instance
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(timestamp(), logFormat),
      defaultMeta: { context },
      transports,
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
