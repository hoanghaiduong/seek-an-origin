import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { GroupPermisson } from "src/group-permisson/entities/group-permisson.entity";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";


export class SignUpDTO {
    @ApiProperty({
        required: false
    })
    @IsEmail({

    }, { message: 'Please enter a valid email address' })
    email: string;
    @ApiProperty({
        required: true
    })
    @IsPhoneNumber('VN', {
        message: 'Please enter a valid phone number'
    })
    phoneNumber: string;
    @ApiProperty()
    password: string;
    @ApiProperty({
        required: false
    })
    displayName: string;
    @ApiProperty({
        required: false
    })
    carrerTitle?: string;

    @ApiProperty({
        required: true
    })
    memberShipId?: string;

    @ApiProperty({
        required: false,
        type: 'string',
        format: 'binary',
    })
    photoURL: Express.Multer.File | any;

    memberShip?: MemberShip;
    groupPermission?: GroupPermisson;
}