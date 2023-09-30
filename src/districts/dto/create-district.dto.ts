import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
    @ApiProperty({
        type: 'string',
        format: "binary"
    })
    file: Express.Multer.File
}
