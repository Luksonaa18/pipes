import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TokenPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('Authorization token is required');
    }
    return value;
  }
}
