import { ApiProperty } from "@nestjs/swagger";
import { ImageTypes } from "src/common/enum/file";
import { ImageTypesBusiness } from "./ImageTypeBusiness.dto";

export class UpdateImageBusinessDTO {
    @ApiProperty({
        required: false
    })
    url: string[];

    @ApiProperty({
        enum: ImageTypesBusiness,
        example: ImageTypesBusiness.CARD_BUSINESS_AVATAR,
        required: false
    })
    imageTypes?: ImageTypesBusiness;

    @ApiProperty({
        required: false,
        type: "string",
        format: 'binary',
        isArray: true
    })
    images: Express.Multer.File[];
}