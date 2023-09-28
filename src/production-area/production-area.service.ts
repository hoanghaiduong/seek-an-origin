import { Injectable } from '@nestjs/common';
import { CreateProductionAreaDto } from './dto/create-production-area.dto';
import { UpdateProductionAreaDto } from './dto/update-production-area.dto';

@Injectable()
export class ProductionAreaService {
  create(createProductionAreaDto: CreateProductionAreaDto) {
    return 'This action adds a new productionArea';
  }

  findAll() {
    return `This action returns all productionArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionArea`;
  }

  update(id: number, updateProductionAreaDto: UpdateProductionAreaDto) {
    return `This action updates a #${id} productionArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionArea`;
  }
}
