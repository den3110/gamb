import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './admin.strategy.jwt';
import { AdminValidateStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MemberAuthController } from './member.auth.controller';
import { MemberValidate } from './member.validate';
import { MemberStrategy } from './member.stategy.jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1y' },
    }),
  ],

  providers: [
    AuthService,
    AdminStrategy,
    MemberStrategy,
    MemberValidate,
    AdminValidateStrategy,
  ],
  controllers: [AuthController, MemberAuthController],
  exports: [AuthService],
})
export class AuthModule {}
