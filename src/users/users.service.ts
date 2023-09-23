import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,

  ) {

  }

  async findAll(pagination: Pagination): Promise<PaginationModel<User>> {
    const [entities, itemCount] = await this.userRepository.findAndCount({
      order: {
        createdAt: pagination.order
      },
      take: pagination.take,
      skip: pagination.skip,
      relations: ['memberShip'],

    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<User>(entities, meta);
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        uid
      }
    })
    if (!user) throw new NotFoundException(`User ${uid} not found`);
    return user
  }
  async findOneNotException(uid: string): Promise<User | boolean> {
    const user = await this.userRepository.findOne({
      where: {
        uid
      }
    })
    if (!user) return false;
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
