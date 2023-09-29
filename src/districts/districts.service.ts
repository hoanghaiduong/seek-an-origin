import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { BaseService } from 'src/base/base.service';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService extends BaseService<District>{
  constructor(@InjectRepository(District) private districtRepository: Repository<District>) {
    super(districtRepository)
  }
}
