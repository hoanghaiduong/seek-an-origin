import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class ForgotPasswordDTO {
    user?: User
    @ApiProperty({
        required: true,
        example: "newPassword"
    })
    password: string;
}