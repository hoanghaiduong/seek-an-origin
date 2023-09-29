import { BadGatewayException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, EntitySchema, EntityTarget, FindOneOptions, FindOptionsOrder, ILike, QueryRunner, Repository } from 'typeorm';
import { BaseEntity } from './entities/base.entity';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';


@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) { }

  async initialData(data: T[]): Promise<{ added: T[], skipped: string[], errors: string[] }> {

    const addedTypes: T[] = [];
    const skippedTypes: string[] = [];
    const errorMessages: string[] = [];
    const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const entity of data) {
        const existingType = await queryRunner.manager.findOne(this.repository.target, {
          where: {
            name: entity.name as any,
          },
        });
        if (!existingType) {
          const newEntity = await queryRunner.manager.save(this.repository.target, entity);
          addedTypes.push(newEntity);
          Logger.error(`Added new : ${entity.name}`);
        } else {
          skippedTypes.push(entity.name);
          Logger.error(`Already exists: ${entity.name}`);
        }
      }

      await queryRunner.commitTransaction();
      return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
    } catch (error) {
      errorMessages.push(error.message);
      Logger.error(`Error during transaction: ${error}`);
      await queryRunner.rollbackTransaction();
      return { added: addedTypes, skipped: skippedTypes, errors: errorMessages };
    } finally {
      await queryRunner.release();
    }
  }
  async findAll(pagination: Pagination): Promise<PaginationModel<T>> {

    const [entities, itemCount] = await this.repository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) as any : null
      },
      order: {
        name: pagination.order as any
      }
    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<T>(entities, meta);
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
