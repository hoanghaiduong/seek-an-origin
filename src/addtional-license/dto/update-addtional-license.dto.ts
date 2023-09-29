import { PartialType } from '@nestjs/swagger';
import { CreateAddtionalLicenseDto } from './create-addtional-license.dto';

export class UpdateAddtionalLicenseDto extends PartialType(CreateAddtionalLicenseDto) {}
