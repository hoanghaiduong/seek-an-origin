import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { Ward } from './entities/ward.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';

@Controller('wards')
@ApiTags("API Phường xã")
export class WardsController extends BaseController<Ward>{
  constructor(private readonly wardsService: WardsService) {
    super(wardsService);
   }
   @Get('getListDistrictByDistrictID')
   async getListWardsByDistrictID(@Query('districtId') districtId: string, @Query() pagination: Pagination): Promise<PaginationModel<Ward>> {
     return await this.wardsService.getListWardsByDistrictID(districtId, pagination)
   }
 
}
