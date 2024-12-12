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

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('admin'))
  @Post('login')
  signIn(@Body() signInDto: Login) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
