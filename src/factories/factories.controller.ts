import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('factories')
@ApiTags("API Quản lý nhà xưởng")
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) { }

  @Post('create')
  async create(@Body() createFactoryDto: CreateFactoryDto) {
    return this.factoriesService.create(createFactoryDto);
  }

  @Get('gets')
  async findAll() {
    return this.factoriesService.findAll();
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return this.factoriesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Query('id') id: string, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoriesService.update(+id, updateFactoryDto);
  }

  @Delete(':id')
  async remove(@Query('id') id: string) {
    return this.factoriesService.remove(+id);
  }
}
