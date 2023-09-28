import { Module } from '@nestjs/common';
import { UnitTypeService } from './unit-type.service';
import { UnitTypeController } from './unit-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UnitType])],
  controllers: [UnitTypeController],
  providers: [UnitTypeService],
  exports:[UnitTypeService]
})
export class UnitTypeModule {}
