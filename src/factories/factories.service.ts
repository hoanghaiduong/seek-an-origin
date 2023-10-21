import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactoriesService {
  constructor(@InjectRepository(Factory) private factoriesRepository: Repository<Factory>) {

  }
  create(createFactoryDto: CreateFactoryDto) {
    return 'This action adds a new factory';
  }

  findAll() {
    return `This action returns all factories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} factory`;
  }

  update(id: number, updateFactoryDto: UpdateFactoryDto) {
    return `This action updates a #${id} factory`;
  }

  remove(id: number) {
    return `This action removes a #${id} factory`;
  }
}
