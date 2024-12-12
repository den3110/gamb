import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class Commission {
  @ApiProperty()
  group_a: number;
  @ApiProperty()
  group_b: number;
  @ApiProperty()
  group_c: number;
  @ApiProperty()
  group_d: number;
  @ApiProperty()
  group_1x2: number;
  @ApiProperty()
  group_orther: number;
}
