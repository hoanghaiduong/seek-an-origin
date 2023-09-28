import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitTypeService } from './unit-type.service';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { BaseController } from 'src/base/base.controller';
import { UnitType } from './entities/unit-type.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('unit-type')
@ApiTags("Đơn vị tính")
export class UnitTypeController extends BaseController<UnitType>{
  constructor(private readonly unitTypeService: UnitTypeService) {
    super(unitTypeService)
  }


}
