import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './guard/firebase.guard';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MemberShipsModule } from 'src/member-ships/member-ships.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),MemberShipsModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, FirebaseService, FirebaseAuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
