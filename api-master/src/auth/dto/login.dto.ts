import { ApiBody, ApiProperty } from '@nestjs/swagger';

export default class Login {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
