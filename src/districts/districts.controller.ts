import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { BaseController } from 'src/base/base.controller';
import { District } from './entities/district.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Province } from 'src/provinces/entities/province.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
@ApiTags("API Quận huyện")
@Controller('districts')
export class DistrictsController extends BaseController<District>{
  constructor(private readonly districtsService: DistrictsService) {
    super(districtsService)
  }
  @Get('getListDistrictByProvinceID')
  async getListDistrictByProvinceID(@Query('provinceId') provinceID: string, @Query() pagination: Pagination): Promise<PaginationModel<Province>> {
    return await this.districtsService.getListDistrictByProvinceID(provinceID, pagination)
  }
}
