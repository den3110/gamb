import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class ConditionWeek {
  @ApiProperty({ default: false })
  monday: boolean;
  @ApiProperty({ default: false })
  tuesday: boolean;
  @ApiProperty({ default: false })
  wednesday: boolean;
  @ApiProperty({ default: false })
  thursday: boolean;
  @ApiProperty({ default: false })
  friday: boolean;
  @ApiProperty({ default: false })
  saturday: boolean;
  @ApiProperty({ default: false })
  sunday: boolean;
}
