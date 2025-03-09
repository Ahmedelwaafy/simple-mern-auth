import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../logger/logger.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new AppLogger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms - ${userAgent} ${ip}`,
      );

      // Log detailed request information for errors
      if (statusCode >= 400) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - Request body: ${JSON.stringify(req.body)}`,
        );
      }
    });

    next();
  }
}
