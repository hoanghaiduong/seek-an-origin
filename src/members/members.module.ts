import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { UsersModule } from 'src/users/users.module';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [UsersModule],
  controllers: [MembersController],
  providers: [MembersService,StorageService],
  exports:[MembersService]
})
export class MembersModule { }
