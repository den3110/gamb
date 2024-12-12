import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class GameSub{
    @ApiProperty()
    @IsNotEmpty()
    ProductID:number;
    @ApiProperty()
    @IsNotEmpty()
    GameType:number;

    @ApiProperty()
    @IsNotEmpty()
    GameId:string;
}