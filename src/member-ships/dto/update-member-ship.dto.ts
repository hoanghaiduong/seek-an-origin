import { PartialType } from '@nestjs/swagger';
import { CreateMemberShipDto } from './create-member-ship.dto';

export class UpdateMemberShipDto extends PartialType(CreateMemberShipDto) {}
