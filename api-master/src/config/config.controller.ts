import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
@UseInterceptors(TransformInterceptor)
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get('alert')
  findAlertAdmin() {
    return this.configService.findConfig('alert');
  }
}
