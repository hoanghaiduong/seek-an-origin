import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { ILike, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { DistrictsService } from 'src/districts/districts.service';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class WardsService extends BaseService<Ward>{
   constructor(@InjectRepository(Ward) private wardsRepository: Repository<Ward>, private districtService: DistrictsService) {
      super(wardsRepository);
   }
   async getListWardsByDistrictID(districtId: string, pagination: Pagination): Promise<PaginationModel<Ward> | any> {
      const district = await this.districtService.findOne(districtId);

      const [entities, itemCount] = await this.wardsRepository.findAndCount({
         take: pagination.take,
         skip: pagination.skip,
         where: {
            district,
            name: pagination.search ? ILike(`%${pagination.search}%`) : null
         },
         order: {
            id: pagination.order
         },

      });
      const meta = new Meta({ itemCount, pagination });
      return new PaginationModel<Ward>(entities, meta);
   }
   async findAll(pagination: Pagination): Promise<PaginationModel<Ward>> {

      const [entities, itemCount] = await this.wardsRepository.findAndCount({
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
      return new PaginationModel<Ward>(entities, meta);
   }
}
