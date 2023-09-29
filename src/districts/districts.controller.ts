import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { BaseController } from 'src/base/base.controller';
import { District } from './entities/district.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("API Quận huyện")
@Controller('districts')
export class DistrictsController extends BaseController<District>{
  constructor(private readonly districtsService: DistrictsService) {
    super(districtsService)
  }

}
