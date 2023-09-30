import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { BaseService } from 'src/base/base.service';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as Excel from 'exceljs'
import * as fs from 'fs';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';
import { District } from 'src/districts/entities/district.entity';
import { DistrictsService } from 'src/districts/districts.service';
type relations = 'districts'
@Injectable()
export class ProvincesService extends BaseService<Province>{
  constructor(@InjectRepository(Province) private provinceRepository: Repository<Province>
   
  ) {
    super(provinceRepository)
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Province>> {

    const [entities, itemCount] = await this.provinceRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      order: {
        id: pagination.order
      },

    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Province>(entities, meta);
  }
  
}
