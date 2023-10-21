import { ApiProperty } from "@nestjs/swagger";
import { GroupPermisson } from "src/group-permisson/entities/group-permisson.entity";
import { MemberShip } from "src/member-ships/entities/member-ship.entity";

export class SignUpSocialDTO{
    email: string;
    phoneNumber: string;
    displayName: string;


    memberShipId?: string;
    photoURL: Express.Multer.File | any;

    memberShip?: MemberShip;
    groupPermission?:GroupPermisson;
}