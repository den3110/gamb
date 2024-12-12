import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOneByUserNamePassword(
      username,
      pass,
    );
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.sign(payload, {
        secret:
          'a483418682e7456acb30ad45bc3ce27b14c1167ae79ca76e5bf43a6d035089b9d38a38947acd336d97151fd7f1bbd98feb348ab084bbb2172b011897e5e4fd08',
        expiresIn: '30d',
      }),
    };
  }

  async signInMember(username, pass) {
    console.log('signInMember');
    const user = await this.usersService.findOneByUserNamePasswordMember(
      username,
      pass,
    );
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.sign(payload, {
        secret:
          '3fcdcfecf70ddff58f84f90405d635deebc09fc65a62b4d02d7d7e6933a8b18a389c135b4a7e7511f9aa43c374351d8b8baab4a22957ed511c16caac10daa577',
        expiresIn: '1d',
      }),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserNamePassword(
      username,
      pass,
    );
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
