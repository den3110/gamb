import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MemberValidate extends PassportStrategy(Strategy, 'member') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '3fcdcfecf70ddff58f84f90405d635deebc09fc65a62b4d02d7d7e6933a8b18a389c135b4a7e7511f9aa43c374351d8b8baab4a22957ed511c16caac10daa577',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
