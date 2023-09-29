import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddtionalLicenseService } from './addtional-license.service';
import { CreateAddtionalLicenseDto } from './dto/create-addtional-license.dto';
import { UpdateAddtionalLicenseDto } from './dto/update-addtional-license.dto';

@Controller('addtional-license')
export class AddtionalLicenseController {
  constructor(private readonly addtionalLicenseService: AddtionalLicenseService) {}

  @Post()
  create(@Body() createAddtionalLicenseDto: CreateAddtionalLicenseDto) {
    return this.addtionalLicenseService.create(createAddtionalLicenseDto);
  }

  @Get()
  findAll() {
    return this.addtionalLicenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addtionalLicenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddtionalLicenseDto: UpdateAddtionalLicenseDto) {
    return this.addtionalLicenseService.update(+id, updateAddtionalLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addtionalLicenseService.remove(+id);
  }
}
