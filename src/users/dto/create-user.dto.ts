import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";

export class CreateUserDto {
    uid: string;
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        required: true
    })
    password: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    photoURL: Express.Multer.File;

    @ApiProperty({ required: true })
    @IsPhoneNumber("VI", { message: 'Invalid phone number (VI) +84' })
    phone_number: string;

    @ApiProperty({ required: false, default: false })
    emailVerified?: boolean;



    @ApiProperty({
        required: true
    })
    displayName: string;

    @ApiProperty({
        required: true
    })
    memberShipId: string;
}

