import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { createHmac } from 'crypto';
@ApiExtraModels()
export class Info {
  @ApiProperty()
  group: string;
  @ApiProperty({
    default: createHmac('sha256', new Date().getMilliseconds.toString())
      .update(new Date().getMilliseconds().toString())
      .digest('hex'),
  })
  username: string;
  @ApiProperty({ default: '123321' })
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  credit_max: number;
  @ApiProperty()
  member_credit_max: number;
  @ApiProperty({ default: '123123' })
  secure_code: string;
}
