import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
@ApiExtraModels()
export class UpdatePasswordRequest {
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
