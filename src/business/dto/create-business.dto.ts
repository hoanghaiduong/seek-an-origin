import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsTaxId } from "class-validator";

export class CreateBusinessDto {
    @ApiProperty({
        required: true
    })
    name: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        required: false
    })
    avatar: Express.Multer.File[]

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        required: false
    })
    licenseBusiness: Express.Multer.File[]

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        required: false
    })
    certificate: Express.Multer.File[]

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        required: false
    })
    inspectionPhoto: Express.Multer.File[]

    @ApiProperty({
        required: false
    })
    // @IsPhoneNumber("VN", { message: "The phone number is not valid for this application and will be rejected when the phone number is invalid" })
    phoneNumber: string;


    @ApiProperty({
        required: false
    })
    // @IsEmail({}, {
    //     message: "Please enter a valid email address"
    // })
    email: string;

    @ApiProperty({
        required: false
    })
    address: string;


    @ApiProperty({
        required: false
    })
    taxCode: string;

    @ApiProperty({
        required: false
    })
    advanced: boolean;

    @ApiProperty({
        required: false
    })
    userId: string;

    @ApiProperty()
    typeModelId: string;
}


