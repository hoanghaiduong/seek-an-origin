import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private storageService: StorageService
  ) { }
  async signUp(dto: CreateAuthDto): Promise<User | any> {
    const userDatabase = await this.userService.findOneNotException(dto.user.uid);
    if (!userDatabase) {
      
        // upload ảnh
        const image = await this.storageService.uploadFile(ImageTypes.CARD_USER, dto.photoURL)
        console.log(image)
      // const newUser = await this.userService.create({
      //   ...dto,

      // });
      return 'không có user trong database tạo mới ngay'
    }
    return 'có nè trả về user trong database đi'
  }
  async signIn(req: any): Promise<User | any> {

  }

}
