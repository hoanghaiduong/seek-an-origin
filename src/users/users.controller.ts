import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Req, UploadedFiles, UploadedFile, BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles, ApiMultipleFieldFiles } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FirebaseAuthGuard } from 'src/auth/guard/firebase.guard';

@Controller('users')
@ApiTags('API USERS')
@UseGuards(FirebaseAuthGuard)
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
  @Put('update')
  @ApiMultipleFieldFiles([
    {
      name: 'certificationPhoto',
      maxCount: 1,
    },
    {
      name: 'photoURL',
      maxCount: 1
    }
  ])
  
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: any, @UploadedFiles() { certificationPhoto, photoURL }: UpdateUserDto): Promise<User | any> {
  
      return await this.usersService.update({
        ...updateUserDto,
        photoURL: photoURL ? photoURL[0] : null,
        certificationPhoto: certificationPhoto ? certificationPhoto[0] : null,
        user: req?.user
      })
 

  }


}
