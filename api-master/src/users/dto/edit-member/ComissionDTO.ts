import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiExtraModels()
export class UpdateCommissionRequest {
  @ApiProperty()
  @IsNotEmpty()
  group_a: number;
  @IsNotEmpty()
  @ApiProperty()
  group_b: number;
  @IsNotEmpty()
  @ApiProperty()
  group_c: number;
  @IsNotEmpty()
  @ApiProperty()
  group_d: number;
  @IsNotEmpty()
  @ApiProperty()
  group_1x2: number;
  @IsNotEmpty()
  @ApiProperty()
  group_orther: number;
}
