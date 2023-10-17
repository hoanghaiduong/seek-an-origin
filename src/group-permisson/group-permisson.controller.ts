import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupPermissonService } from './group-permisson.service';
import { CreateGroupPermissonDto } from './dto/create-group-permisson.dto';
import { UpdateGroupPermissonDto } from './dto/update-group-permisson.dto';
import { BaseController } from 'src/base/base.controller';
import { GroupPermisson } from './entities/group-permisson.entity';

@Controller('group-permisson')
export class GroupPermissonController extends BaseController<GroupPermisson> {
  constructor(private groupPermissonService: GroupPermissonService) {
    super(groupPermissonService)
  }

}
