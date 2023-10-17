import { Injectable } from '@nestjs/common';
import { CreateGroupPermissonDto } from './dto/create-group-permisson.dto';
import { UpdateGroupPermissonDto } from './dto/update-group-permisson.dto';
import { BaseService } from 'src/base/base.service';
import { GroupPermisson } from './entities/group-permisson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupPermissonService extends BaseService<GroupPermisson>{
  constructor(@InjectRepository(GroupPermisson) private groupPermissionRepository: Repository<GroupPermisson>) {
    super(groupPermissionRepository)
  }
}
