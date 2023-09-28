import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTypeModelDto } from './dto/create-type-model.dto';
import { UpdateTypeModelDto } from './dto/update-type-model.dto';
import { BaseService } from 'src/base/base.service';
import { TypeModel } from './entities/type-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeModelService extends BaseService<TypeModel> implements OnModuleInit {
  constructor(@InjectRepository(TypeModel) private typeModelRepository: Repository<TypeModel>) {
    super(typeModelRepository);
  }
  async onModuleInit(): Promise<void> {
    const typeModels = [
      { name: 'Vùng trồng' },
      { name: 'Nhóm sản xuất' },
      { name: 'Trang trại' },
      { name: 'Vườn trồng' },
      { name: 'Ao nuôi' },
      { name: 'Chuồng nuôi' },
      { name: 'Lô (thừa) sản xuất' },
      { name: 'Vùng nuôi' },
      { name: 'Vùng khai thác' },
    ];

    await this.initialData(typeModels as any);
  }
}
