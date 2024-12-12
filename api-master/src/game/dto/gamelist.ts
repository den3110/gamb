import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class GameList{
    @ApiProperty()
    @IsNotEmpty()
    ProductID:number;
    @ApiProperty()
    @IsNotEmpty()
    GameType:number;
}