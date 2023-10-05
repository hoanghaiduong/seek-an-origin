import { Module } from '@nestjs/common';
import { AddtionalLicenseService } from './addtional-license.service';
import { AddtionalLicenseController } from './addtional-license.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddtionalLicense } from './entities/addtional-license.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddtionalLicense])],
  controllers: [AddtionalLicenseController],
  providers: [AddtionalLicenseService]
})
export class AddtionalLicenseModule { }
