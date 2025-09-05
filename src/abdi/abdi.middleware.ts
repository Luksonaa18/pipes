import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AbdiMiddleware implements NestMiddleware {
  use(req: any, res: import('express').Response, next: () => void) {
    const originalSend = res.send;
    res.send = function (body: unknown): import('express').Response {
      const wrappedResponse = {
        status: 'success',
        data: body as object,
        timestamp: new Date().toISOString(),
      };
      return originalSend.call(
        this,
        wrappedResponse,
      ) as import('express').Response;
    } as import('express').Response['send'];

    next();
  }
}
