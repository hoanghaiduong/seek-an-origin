import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MemberShip } from 'src/member-ships/entities/member-ship.entity';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,MemberShip])],
  controllers: [UsersController],
  providers: [UsersService,MemberShipsService,FirebaseService,StorageService],
  exports:[UsersService]
})
export class UsersModule {}
