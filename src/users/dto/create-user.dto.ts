import { ApiProperty } from "@nestjs/swagger";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";

export class CreateUserDto {
    uid: string;
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    photoURL: Express.Multer.File;

    @ApiProperty()
    phoneNumber: string;

    emailVerified: boolean;

    

    @ApiProperty()
    displayName: string;

    @ApiProperty()
    memberShipId: string;
}
