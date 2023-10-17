import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberShip } from './entities/member-ship.entity';
import { EntitySchema, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class MemberShipsService extends BaseService<MemberShip> implements OnModuleInit {
  constructor(
    @InjectRepository(MemberShip)
    private memberTypeRepository: Repository<MemberShip>,
  ) {
    super(memberTypeRepository);
  }


  async findOneByName(name: string): Promise<MemberShip> {
    const memberShip = await this.memberTypeRepository.findOne({
      where: {
        name
      }
    })
    return memberShip

  }
  async onModuleInit(): Promise<void> {
    const memberShips = [
      { name: 'Cá nhân' },
      { name: 'Doanh Nghiệp' },
      { name: 'Cơ quan quản lý' },
    ];
    const creating = this.memberTypeRepository.create(memberShips);
    await this.initialData(creating);
  }
}
