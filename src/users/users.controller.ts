import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('API USERS')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('get')
  async get(@Query('uid') uid: string): Promise<User> {
    return await this.usersService.findOne(uid);
  }
  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<User>> {
    return this.usersService.findAll(pagination);
  }
}
