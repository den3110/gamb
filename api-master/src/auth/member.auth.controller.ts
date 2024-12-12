import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import Login from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';

@Controller('member')
@ApiTags('member')
@UseInterceptors(TransformInterceptor)
export class MemberAuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('membersign'))
  @Post('login')
  signIn(@Body() signInDto: Login) {
    return this.authService.signInMember(
      signInDto.username,
      signInDto.password,
    );
  }
}
