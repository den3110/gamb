import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Info } from './InfoDTO';
import { Commission } from './ComissionDTO';
import { Condition } from './ConditionDTO';

@ApiExtraModels()
export class CreateMemberRequest {
  @ApiProperty()
  member_info: Info;
  @ApiProperty()
  commission: Commission;
  @ApiProperty()
  condition: Condition;
}
