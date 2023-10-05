import { CreateUserDto } from './create-user.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserInfo } from 'firebase-admin/lib/auth/user-record';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['email', 'phone_number', 'uid', 'password'])
) {
    user?: UserInfo;
    @ApiProperty({
        required: false
    })
    sepecificAddress: string; //Địa chỉ cụ thể
    @ApiProperty({
        required: false
    })
    generalInformation: string; //Thông tin chung trong update profile
    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false
    })
    certificationPhoto: Express.Multer.File;    //Hình ảnh chứng nhận 
    @ApiProperty({
        required: false
    })
    careerTitle: string; //Chức danh 
}
