import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class CloneMemberRequest {
  @ApiProperty()
  memberSourceId: number
  @ApiProperty()
  userName: string
  @ApiProperty()
  password: string
  @ApiProperty()
  credit: number
  @ApiProperty()
  noNumber: number
}