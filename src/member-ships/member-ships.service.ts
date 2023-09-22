import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberShip } from './entities/member-ship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberShipsService  extends BaseService<MemberShip>  {
  constructor(
    @InjectRepository(MemberShip)
    private  memberTypeRepository: Repository<MemberShip>,
  ) {
    super(memberTypeRepository);
  }
}
