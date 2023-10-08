import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { TypeModelService } from 'src/type-model/type-model.service';
import { TypeModel } from 'src/type-model/entities/type-model.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { StorageService } from 'src/storage/storage.service';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { MemberShip } from 'src/member-ships/entities/member-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, TypeModel, User, MemberShip])],
  controllers: [BusinessController],
  providers: [BusinessService, TypeModelService, UsersService, StorageService, MemberShipsService],
  exports: [BusinessService]
})
export class BusinessModule { }
