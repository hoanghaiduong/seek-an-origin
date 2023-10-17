import { PartialType } from '@nestjs/swagger';
import { CreateGroupPermissonDto } from './create-group-permisson.dto';

export class UpdateGroupPermissonDto extends PartialType(CreateGroupPermissonDto) {}
