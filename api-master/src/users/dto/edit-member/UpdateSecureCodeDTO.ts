import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
@ApiExtraModels()
export class UpdatePassCodeRequest {
  @ApiProperty()
  @IsNotEmpty()
  secure_code: string;
}
