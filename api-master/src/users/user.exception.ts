import { BadRequestException } from '@nestjs/common';

export class UserDuplicate extends BadRequestException {
  constructor() {
    super('UserDuplicate');
  }
}
