import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";

export class CreateMemberDTO {

    uid: string;
    @ApiProperty({
        isArray: true,
        type: 'string',
        format: 'binary',
    })
    avatar: Express.Multer.File;
    @ApiProperty({
        required: true
    })
    displayName: string;
    @ApiProperty({
        required: true
    })
    password: string;
    @ApiProperty({
        required: true
    })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;

    @ApiProperty({
        required: true
    })
    @IsPhoneNumber('VN', { 'message': 'Please enter a valid phone number' })
    phone_number: string;

    @ApiProperty({
        required: true
    })
    memberShipId: string;

    @ApiProperty({
        required: false
    })
    userManagerId: string

    @ApiProperty({
        required: false
    })
    factoryId: string;
    @ApiProperty({
        required: true
    })
    groupPermissionId: string

    @ApiProperty({
        required: false
    })
    information: string;
}