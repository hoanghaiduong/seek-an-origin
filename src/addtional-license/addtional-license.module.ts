import { Module } from '@nestjs/common';
import { AddtionalLicenseService } from './addtional-license.service';
import { AddtionalLicenseController } from './addtional-license.controller';

@Module({
  controllers: [AddtionalLicenseController],
  providers: [AddtionalLicenseService]
})
export class AddtionalLicenseModule {}
