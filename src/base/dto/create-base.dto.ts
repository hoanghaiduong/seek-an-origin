import { ApiProperty } from "@nestjs/swagger";

export class CreateBaseDto {
    @ApiProperty()
    name: string;

    description?: string;
}
