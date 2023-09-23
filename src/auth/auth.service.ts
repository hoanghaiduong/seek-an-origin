import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { MemberShipsService } from 'src/member-ships/member-ships.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UsersService,
    private storageService: StorageService,
    private memberShipService: MemberShipsService
  ) { }
  async signUp(dto: CreateAuthDto): Promise<User | any> {
    // console.log(dto.user.uid)
    const userDatabase = await this.userService.findOneNotException(dto.user.uid);
    if (!userDatabase) {
      // upload ảnh
      const image = await this.storageService.uploadFile(ImageTypes.CARD_USER, dto.photoURL);
      const memberShip = await this.memberShipService.findOne(dto.memberShipId);
      const newUser = this.userRepository.create({
        ...dto,
        uid: dto.user.uid,
        photoURL: image,
        memberShip: memberShip,
     

      });
      return await this.userRepository.save(newUser);
    }
    return userDatabase;
  }
  async signIn(req: any): Promise<User | any> {

  }

}
