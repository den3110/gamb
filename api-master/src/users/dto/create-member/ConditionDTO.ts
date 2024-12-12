import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConditionWeek } from "./ConditionWeek";

@ApiExtraModels()
export class Condition{
    @ApiProperty()
    is_all: boolean;
    @ApiProperty()
    is_week: ConditionWeek;
}
