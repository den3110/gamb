import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { DayOfWeeb } from 'src/users/user_transfer.enum';

@ApiExtraModels()
export class EditConditionTransferRequest {
  @ApiProperty({ default: -1 })
  transfer_config: DayOfWeeb;
}
