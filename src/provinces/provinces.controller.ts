import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

import { Province } from './entities/province.entity';
import { BaseController } from 'src/base/base.controller';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';
import { CreateProvinceDto } from './dto/create-province.dto';
import { Multer } from 'multer';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';

@Controller('provinces')
@ApiTags("API Tỉnh thành")
export class ProvincesController extends BaseController<Province>{
  constructor(private readonly provinceService: ProvincesService) {
    super(provinceService)
  }
 
}