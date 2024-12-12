import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export default class CheckCodeRequest {
  @ApiProperty()
  code: string;
}
