import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/base/base.service';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';
import { ProvincesService } from 'src/provinces/provinces.service';
@Injectable()
export class DistrictsService extends BaseService<District>{
  constructor(@InjectRepository(District) private districtRepository: Repository<District>,
    private provinceService: ProvincesService
  ) {
    super(districtRepository)
  }
  async getListDistrictByProvinceID(provinceId: string, pagination: Pagination): Promise<PaginationModel<District> | any> {
    const province = await this.provinceService.findOne(provinceId);

    const [entities, itemCount] = await this.districtRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: {
        province,
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      order: {
        id: pagination.order
      },

    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<District>(entities, meta);
  }
  async findAll(pagination: Pagination): Promise<PaginationModel<District>> {
    const [entities, itemCount] = await this.districtRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      order: {
        id: pagination.order
      },
      relations: ['wards']
    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<District>(entities, meta);
  }
}
