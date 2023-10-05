import { ApiProperty } from "@nestjs/swagger";

export class CreateProductionAreaDto {
    @ApiProperty()
    name: string;

    @ApiProperty({
        isArray: true,
        type:'string',
        format:'binary',
    })
    images


}
