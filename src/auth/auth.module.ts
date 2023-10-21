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
import { StorageService } from 'src/storage/storage.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt.refresh.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { GroupPermissonService } from 'src/group-permisson/group-permisson.service';
import { GroupPermissonModule } from 'src/group-permisson/group-permisson.module';

@Module({
  imports: [UsersModule, MemberShipsModule,
    GroupPermissonModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, StorageService, FirebaseService, FirebaseAuthGuard, LocalStrategy, JwtStrategy, JwtRefreshStrategy,],
  exports: [AuthService]
})
export class AuthModule { }
