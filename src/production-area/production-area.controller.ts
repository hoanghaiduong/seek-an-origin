import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionAreaService } from './production-area.service';
import { CreateProductionAreaDto } from './dto/create-production-area.dto';
import { UpdateProductionAreaDto } from './dto/update-production-area.dto';

@Controller('production-area')
export class ProductionAreaController {
  constructor(private readonly productionAreaService: ProductionAreaService) {}

  @Post()
  create(@Body() createProductionAreaDto: CreateProductionAreaDto) {
    return this.productionAreaService.create(createProductionAreaDto);
  }

  @Get()
  findAll() {
    return this.productionAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionAreaDto: UpdateProductionAreaDto) {
    return this.productionAreaService.update(+id, updateProductionAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionAreaService.remove(+id);
  }
}
