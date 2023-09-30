import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Province } from 'src/provinces/entities/province.entity';
import { ProvincesService } from 'src/provinces/provinces.service';

@Module({
  imports: [TypeOrmModule.forFeature([District,Province])],
  controllers: [DistrictsController],
  providers: [DistrictsService,ProvincesService],
  exports: [DistrictsService]
})
export class DistrictsModule { }
