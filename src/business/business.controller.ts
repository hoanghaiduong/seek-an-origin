import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiMultipleFieldFiles } from 'src/common/decorators/file.decorator';
import { Business } from './entities/business.entity';

@Controller('business')
@ApiTags("API Quản lý Doanh nghiệp")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Post("create")
  @ApiMultipleFieldFiles([
    {
      name: "avatar",
      maxCount: 3,
    },
    {
      name: "licenseBusiness",
      maxCount: 3,
    },
    {
      name: "certificate",
      maxCount: 3,
    },
    {
      name: "inspectionPhoto",
      maxCount: 3,
    },
  ])
  async create(@Body() createBusinessDto: CreateBusinessDto, @UploadedFiles() files: {
    avatar: Express.Multer.File[],
    licenseBusiness: Express.Multer.File[],
    certificate: Express.Multer.File[],
    inspectionPhoto: Express.Multer.File[],
  }): Promise<Business | any> {
    // const avatar=files
    const { avatar, licenseBusiness, certificate, inspectionPhoto } = files;

    return await this.businessService.create({
      ...createBusinessDto,
      avatar,
      licenseBusiness,
      certificate,
      inspectionPhoto
    });
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}
