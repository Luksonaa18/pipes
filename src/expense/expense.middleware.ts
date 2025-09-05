import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

@Injectable()
export class ExpenseMiddleware implements NestMiddleware {
  private logger = morgan('dev');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, () => {
      const lang = req.query.lang as string;

      if (lang === 'en') {
        res.send({ message: 'Hello! This is the expense route.' });
      } else if (lang === 'ge') {
        res.send({ message: 'გამარჯობა! ეს არის ხარჯების მარშრუტი.' });
      } else {
        next();
      }
    });
  }
}
