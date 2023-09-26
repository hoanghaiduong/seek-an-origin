import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";

export class CreateUserDto {
    uid: string;
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    photoURL: Express.Multer.File;

    @ApiProperty()
    @IsPhoneNumber("VI", { message: 'Invalid phone number (VI) +84' })
    phoneNumber: string;

    emailVerified: boolean;



    @ApiProperty()
    displayName: string;

    @ApiProperty()
    memberShipId: string;
}
