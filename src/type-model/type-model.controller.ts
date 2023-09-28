import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeModelService } from './type-model.service';
import { CreateTypeModelDto } from './dto/create-type-model.dto';
import { UpdateTypeModelDto } from './dto/update-type-model.dto';
import { BaseController } from 'src/base/base.controller';
import { TypeModel } from './entities/type-model.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('type-model')
@ApiTags('API Loại Hình')
export class TypeModelController extends BaseController<TypeModel>{
  constructor(private  typeModelService: TypeModelService) {
    super(typeModelService);
  }

}
