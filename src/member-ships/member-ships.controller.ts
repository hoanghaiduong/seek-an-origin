import { Controller } from '@nestjs/common';
import { MemberShipsService } from './member-ships.service';

import { BaseController } from 'src/base/base.controller';
import { MemberShip } from './entities/member-ship.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('member-ships')
@ApiTags("MemberShip")
export class MemberShipsController extends BaseController<MemberShip>{
  constructor(private memberShipsService: MemberShipsService) {
    super(memberShipsService)
  }

}
