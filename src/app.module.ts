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
import { ProductionAreaModule } from './production-area/production-area.module';
import { TypeModelModule } from './type-model/type-model.module';
import { UnitTypeModule } from './unit-type/unit-type.module';



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
    ProductionAreaModule,
    TypeModelModule,
    UnitTypeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
