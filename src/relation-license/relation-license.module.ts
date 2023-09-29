import { Module } from '@nestjs/common';
import { RelationLicenseService } from './relation-license.service';
import { RelationLicenseController } from './relation-license.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationLicense } from './entities/relation-license.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RelationLicense])],
  controllers: [RelationLicenseController],
  providers: [RelationLicenseService],
  exports:[RelationLicenseService]
})
export class RelationLicenseModule {}
