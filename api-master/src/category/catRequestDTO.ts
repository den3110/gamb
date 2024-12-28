import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CatRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  CatId: number;
}
