import { Injectable, NestMiddleware } from '@nestjs/common';
import { json } from 'body-parser';
import { IncomingMessage, ServerResponse } from 'http';
import { NextFunction } from 'express';

/**
 * Copied this middleware to parse the raw response into a param to use later
 * from https://github.com/golevelup/nestjs/blob/master/packages/webhooks/src/webhooks.middleware.ts
 */
@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  public use(req: IncomingMessage, res: ServerResponse, next: NextFunction): any {
    json({
      verify: (req: IncomingMessage, res: ServerResponse, buffer: Buffer) => {
        if (Buffer.isBuffer(buffer)) {
          req['rawBody'] = Buffer.from(buffer);
        }
        return true;
      },
    })(req, res, next);
  }
}
