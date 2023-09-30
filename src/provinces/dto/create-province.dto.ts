import { ApiProperty } from "@nestjs/swagger";

export class CreateProvinceDto {
    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    file: Express.Multer.File;
}
