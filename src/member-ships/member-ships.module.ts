import { Module } from '@nestjs/common';
import { MemberShipsService } from './member-ships.service';
import { MemberShipsController } from './member-ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberShip } from './entities/member-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberShip])],
  controllers: [MemberShipsController],
  providers: [MemberShipsService],
  exports:[MemberShipsService]
})
export class MemberShipsModule { }
