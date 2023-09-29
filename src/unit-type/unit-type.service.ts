import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class UnitTypeService extends BaseService<UnitType> implements OnModuleInit {
  constructor(@InjectRepository(UnitType) private _unitTypeRepository: Repository<UnitType>) {
    super(_unitTypeRepository);
  }
  async onModuleInit(): Promise<void> {
    const creating = this._unitTypeRepository.create([
      { name: 'ha' },
      { name: 'km2' },
      { name: 'm2' },
    ])
    await this.initialData(creating);
  }


}
