import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { User } from 'src/users/entities/user.entity';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';


@Injectable()
export class MembersService {
  constructor(
    private readonly userService: UsersService,
   
    private readonly storeService: StorageService
  ) {

  }
  async create(createMemberDto: CreateMemberDTO): Promise<User> {
    const avatar = await this.storeService.uploadFile(ImageTypes.CARD_USER, createMemberDto.avatar);
    // const [groupPermission,memberShip,factory,userManager]=await Promise.all([
    //   this.userService.findOne(createMemberDto.userManagerId),
   
    // ])
    
    return;

  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: any) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
