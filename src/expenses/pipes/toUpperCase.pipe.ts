import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExpensesServicePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid string');
    }
    return value.toUpperCase();
  }
}
