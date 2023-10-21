import { Injectable, OnModuleInit,NotFoundException } from '@nestjs/common';
import { CreateGroupPermissonDto } from './dto/create-group-permisson.dto';
import { UpdateGroupPermissonDto } from './dto/update-group-permisson.dto';
import { BaseService } from 'src/base/base.service';
import { GroupPermisson } from './entities/group-permisson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupPermissonService extends BaseService<GroupPermisson> implements OnModuleInit {
  constructor(@InjectRepository(GroupPermisson) private groupPermissionRepository: Repository<GroupPermisson>) {
    super(groupPermissionRepository)
  }
  async onModuleInit(): Promise<void> {
    const groupPermission = [
      { name: 'ADMIN' },
      { name: 'USER' },
      { name: 'BUSINESS' },
    ];
    const creating = this.groupPermissionRepository.create(groupPermission);
    await this.initialData(creating);
  }
  async findByName(name: string): Promise<GroupPermisson> {
    const groupPermission= await this.groupPermissionRepository.findOne({
      where: {
        name
      }
    })
    if(!groupPermission) throw new NotFoundException('Group permission not found')
    return groupPermission;
  }

}
