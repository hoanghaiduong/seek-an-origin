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

  // async onModuleInit(): Promise<{ added: MemberShip[], skipped: string[], errors: string[] }> {
  //   const memberShips = [
  //     { name: 'Cá nhân' },
  //     { name: 'Doanh Nghiệp' },
  //     { name: 'Cơ quan quản lý' },
  //   ];
  //   const addedTypes: MemberShip[] = [];
  //   const skippedTypes: string[] = [];
  //   const errorMessages: string[] = [];
  //   const queryRunner: QueryRunner = this.memberTypeRepository.manager.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     for (const memberShip of memberShips) {
  //       const existingType = await queryRunner.manager.findOne(MemberShip, {
  //         where: {
  //           name: memberShip.name,
  //         },
  //       });
  //       if (!existingType) {
  //         const newMember = await queryRunner.manager.save(MemberShip, memberShip);
  //         addedTypes.push(newMember);
  //         Logger.error(`Added new type: ${memberShip.name}`);
  //       } else {
  //         skippedTypes.push(memberShip.name);
  //         Logger.error(`Member already exists: ${memberShip.name}`);
  //       }
  //     }

  //     await queryRunner.commitTransaction();
  //     return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
  //   } catch (error) {
  //     errorMessages.push(error.message);
  //     Logger.error(`Error during transaction: ${error}`);
  //     await queryRunner.rollbackTransaction();
  //     return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async onModuleInit(): Promise<void> {
    const memberShips = [
      { name: 'Cá nhân' },
      { name: 'Doanh Nghiệp' },
      { name: 'Cơ quan quản lý' },
    ];

    await this.initialData(memberShips as any);
  }
}
