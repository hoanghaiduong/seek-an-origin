import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class ChangePasswordDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    user?: User;
}