import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDTO {
    @ApiProperty({
        required: true,
        example: "newPassword"
    })
    password: string;
}