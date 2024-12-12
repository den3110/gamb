import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
@ApiExtraModels()
export class UpdateInfoRequest {
  @ApiProperty()
  group: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
}
