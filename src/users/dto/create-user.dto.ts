import { ApiProperty } from "@nestjs/swagger";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    photoURL: Express.Multer.File;

    emailVerified: boolean;

    firebase: object;

    uid: string;
    @ApiProperty()
    displayName: string;

    @ApiProperty()
    memberShipId: string;
}
