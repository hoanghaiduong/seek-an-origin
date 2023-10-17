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
import { RelationLicenseModule } from './relation-license/relation-license.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictsModule } from './districts/districts.module';
import { WardsModule } from './wards/wards.module';
import { AddtionalLicenseModule } from './addtional-license/addtional-license.module';
import { TransactionModule } from './transaction/transaction.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ProductModule } from './product/product.module';
import { BusinessModule } from './business/business.module';
import { MaterialsModule } from './materials/materials.module';
import { GroupPermissonModule } from './group-permisson/group-permisson.module';



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
    RelationLicenseModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    AddtionalLicenseModule,
    TransactionModule,
    ShipmentModule,
    ProductModule,
    BusinessModule,
    MaterialsModule,
    GroupPermissonModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
