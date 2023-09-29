import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { BaseService } from 'src/base/base.service';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService extends BaseService<Province>{
  constructor(@InjectRepository(Province) private provinceRepository: Repository<Province>) {
    super(provinceRepository)
  }
}
