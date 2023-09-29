import { PartialType } from '@nestjs/swagger';
import { CreateRelationLicenseDto } from './create-relation-license.dto';

export class UpdateRelationLicenseDto extends PartialType(CreateRelationLicenseDto) {}
