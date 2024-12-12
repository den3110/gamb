import { BadRequestException } from '@nestjs/common';

export class TraffictInvalidException extends BadRequestException {
  constructor() {
    super('The number of messages has expired, please contact admin');
  }
}

export class UserNotMemberOfAgent extends BadRequestException {
  constructor() {
    super('You not management this user');
  }
}

export class NotAllowAccess extends BadRequestException {
  constructor() {
    super('Account Not Exits or Blocked or Not Have Permission');
  }
}

export class TransactionGameDuplicate extends BadRequestException {
  constructor() {
    super('TransactionGameDuplicate');
  }
}
