import { ApiProperty } from "@nestjs/swagger";


export class SignInDTO {
    user?: any;
    email?: string;

    @ApiProperty()
    phoneNumber: string;
    @ApiProperty()
    password: string;
}