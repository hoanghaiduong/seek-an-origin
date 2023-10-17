import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, Query, Put } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiFiles, ApiMultipleFieldFiles } from 'src/common/decorators/file.decorator';
import { Business } from './entities/business.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { FileTypes, ImageTypes } from 'src/common/enum/file';
import { UpdateImageBusinessDTO } from './dto/update-image.dto';
import { ImageTypesBusiness } from './dto/ImageTypeBusiness.dto';

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

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Business>> {
    return await this.businessService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query('id') id: string): Promise<Business> {
    return await this.businessService.findOne(id);
  }



  // @Put('updateImage-certificate')
  // @ApiFiles('certificate', 5, FileTypes.IMAGE)
  // async updateImageCertificate(@Body() updateImageBusinessDTO: UpdateImageBusinessDTO, @UploadedFiles() certificate: Express.Multer.File[]): Promise<any> {
  //   return await this.businessService.updateImageCertificate({
  //     ...updateImageBusinessDTO,
  //     certificate
  //   })
  // }
  // @Put('updateImage-licenseBusiness')
  // @ApiFiles('licenseBusiness', 5, FileTypes.IMAGE)
  // async updateImageLicenseBusiness(@Body() updateImageBusinessDTO: UpdateImageBusinessDTO, @UploadedFiles() licenseBusiness: Express.Multer.File[]): Promise<any> {
  //   return await this.businessService.updateImageLicenseBusiness({
  //     ...updateImageBusinessDTO,
  //     licenseBusiness
  //   })
  // }
  // @Put('updateImage-avatar')
  // @ApiFiles('avatar', 5, FileTypes.IMAGE)
  // async updateImageAvatar(@Body() updateImageBusinessDTO: UpdateImageBusinessDTO, @UploadedFiles() avatar: Express.Multer.File[]): Promise<any> {
  //   return await this.businessService.updateImageAvatar({
  //     ...updateImageBusinessDTO,
  //     avatar
  //   })
  // }
  @Put('updateImage')
  @ApiFiles('images', 5, FileTypes.IMAGE)
  async updateImage(@Query('id') id: string, @Body() updateImageBusinessDTO: UpdateImageBusinessDTO, @UploadedFiles() images: Express.Multer.File[]): Promise<any> {
    return await this.businessService.updateImage(id, {
      ...updateImageBusinessDTO,
      images
    })
  }


  // @Put('updateImage-inspectionPhoto')
  // @ApiFiles('inspectionPhoto', 5, FileTypes.IMAGE)
  // async updateImageInspectionPhoto(@Body() updateImageBusinessDTO: UpdateImageBusinessDTO, @UploadedFiles() inspectionPhoto: Express.Multer.File[]): Promise<any> {
  //   return await this.businessService.updateImageInspectionPhoto({
  //     ...updateImageBusinessDTO,
  //     inspectionPhoto
  //   })
  // }
  @Patch('update')
  async update(@Query('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto): Promise<Business> {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<Business | Object> {
    return await this.businessService.remove(id);
  }
}
