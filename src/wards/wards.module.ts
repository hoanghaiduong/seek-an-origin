import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { District } from 'src/districts/entities/district.entity';
import { DistrictsService } from 'src/districts/districts.service';
import { Province } from 'src/provinces/entities/province.entity';
import { ProvincesService } from 'src/provinces/provinces.service';

@Module({
  imports:[TypeOrmModule.forFeature([Ward,District,Province])],
  controllers: [WardsController],
  providers: [WardsService,DistrictsService,ProvincesService],
  exports:[WardsService]
})
export class WardsModule {}
