import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './create-business.dto';

export class UpdateBusinessDto extends PartialType(
    OmitType(
        CreateBusinessDto, ['certificate', 'inspectionPhoto', 'avatar', 'licenseBusiness']
    )
) { }
