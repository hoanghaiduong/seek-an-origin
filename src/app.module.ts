import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/config/validation.config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MemberShipsModule } from './member-ships/member-ships.module';
import { StorageModule } from './storage/storage.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`], // load env
    }),
    DatabaseModule,
    FirebaseModule,
    AuthModule,
    UsersModule,
    MemberShipsModule,
    StorageModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
