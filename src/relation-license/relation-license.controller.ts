import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelationLicenseService } from './relation-license.service';
import { CreateRelationLicenseDto } from './dto/create-relation-license.dto';
import { UpdateRelationLicenseDto } from './dto/update-relation-license.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('relation-license')
@ApiTags("Giấy phép liên quan")
export class RelationLicenseController {
  constructor(private readonly relationLicenseService: RelationLicenseService) {}

  @Post()
  create(@Body() createRelationLicenseDto: CreateRelationLicenseDto) {
    return this.relationLicenseService.create(createRelationLicenseDto);
  }

  @Get()
  findAll() {
    return this.relationLicenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationLicenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelationLicenseDto: UpdateRelationLicenseDto) {
    return this.relationLicenseService.update(+id, updateRelationLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationLicenseService.remove(+id);
  }
}
