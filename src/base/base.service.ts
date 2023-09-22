import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { BaseEntity } from './entities/base.entity';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';


@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) { }

  async findAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.repository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async findOne(id: string): Promise<T> {
    try {
      const data = await this.repository.findOne({
        where: { id: id } as any,
      });
      if (!data) {
        // Xử lý trường hợp không tìm thấy đối tượng
        throw new NotFoundException('Entity not found');
      }

      return data;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }



  async create(dto: CreateBaseDto): Promise<T> {
    try {
      const newEntity = this.repository.create(dto as DeepPartial<T>);
      return await this.repository.save(newEntity);

    }
    catch (error) {
      throw new BadGatewayException(error);
    }
  }


  async update(id: string, updateDto: UpdateBaseDto): Promise<T | any> {
    try {
      const entity = await this.findOne(id);

      if (!entity) {
        throw new NotFoundException('Entity not found');
      }
      return await this.repository.save({
        ...entity,
        ...updateDto
      })

      // return updatedEntity;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async delete(id: string): Promise<Object> {
    try {
      const find = await this.findOne(id);
      await this.repository.remove(find);
      return {
        message: `Deleted with id: ${id} successfully`
      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
