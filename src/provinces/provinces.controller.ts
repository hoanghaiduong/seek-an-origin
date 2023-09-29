import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

import { Province } from './entities/province.entity';
import { BaseController } from 'src/base/base.controller';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';

@Controller('provinces')
@ApiTags("API Tỉnh thành")
export class ProvincesController extends BaseController<Province>{
  constructor(private readonly provinceService: ProvincesService) {
    super(provinceService)
  }
  @Post('upload')
  @ApiFile('file',FileTypes.EXCEL)
  async uploadDataProvince(): Promise<any> {

  }
}