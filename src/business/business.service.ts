import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeModelService } from 'src/type-model/type-model.service';
import { TypeModel } from 'src/type-model/entities/type-model.entity';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { UpdateImageBusinessDTO } from './dto/update-image.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectRepository(Business) private businessRepository: Repository<Business>,
    private typeModelService: TypeModelService,
    private userService: UsersService,
    private storageService: StorageService
  ) {

  }
  async create(createBusinessDto: CreateBusinessDto): Promise<Business | any> {
    try {
      const { typeModelId, userId } = createBusinessDto;
      const [typeModel] = await Promise.all([
        this.typeModelService.findOne(typeModelId),
        // this.userService.findOne(userId)
      ]);
      const avatar = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_AVATAR, createBusinessDto.avatar)
      const licenseBusiness = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_LICENSE, createBusinessDto.licenseBusiness)
      const certificate = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_CERT, createBusinessDto.certificate)
      const inspectionPhoto = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_INSPECTION, createBusinessDto.inspectionPhoto)
      const creating = this.businessRepository.create({
        ...createBusinessDto,
        user: null,
        typeModel,
        avatar,
        licenseBusiness: licenseBusiness,
        certificate: certificate,
        inspectionPhoto: inspectionPhoto,
      })
      const saving = await this.businessRepository.save(creating);
      return saving
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }


  async findAll(pagination: Pagination): Promise<PaginationModel<Business>> {
    const queryBuilder = this.businessRepository.createQueryBuilder('business');
    queryBuilder
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('business.createdAt', pagination.order);

    if (pagination.search) {
      queryBuilder.where((qb: SelectQueryBuilder<Business>) => {
        qb.where('business.name ILIKE :search', { search: `%${pagination.search}%` })
          .orWhere('business.taxCode ILIKE :search', { search: `%${pagination.search}%` });

      });
    }
    // Sử dụng leftJoinAndSelect để ghép bảng relationship (typeModel)
    queryBuilder.leftJoinAndSelect('business.typeModel', 'typeModel');

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Business>(entities, meta);
  }
  async findOne(id: string): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: {
        id
      }
    })
    if (!business) throw new NotFoundException("Business not found in the database")
    return business
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto): Promise<any | Business> {
    try {
      const [business, typeModel] = await Promise.all([
        this.findOne(id),
        this.typeModelService.findOne(updateBusinessDto.typeModelId)
      ]);
      const merged = this.businessRepository.merge(business, {
        ...updateBusinessDto,
        typeModel
      })
      // Cập nhật business
      await this.businessRepository.save(merged);

      return business;


    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }
  // async uploadImageBusinessCertificate(business: Business, oldImageName: string[], images: Express.Multer.File[]): Promise<any> {
  //   const arrTemp: string[] = [];//chứa các ảnh đã tồn tại

  //   for (const oldImage of business.certificate) {//lặp qua các ảnh gửi lên
  //     if (oldImageName.includes(oldImage)) {
  //       arrTemp.push(oldImage);
  //       // Thực hiện xử lý cho các ảnh đã tồn tại trong business.certificate
  //     }
  //   }
  //   //kiểm tra xem các ảnh có 
  //   for (const exists of arrTemp) //bởi vì nếu truyền lên oldImageName thì xác định là sẽ xoá ảnh đó và upload ảnh mới còn không thì không upload
  //   {
  //     await this.storageService.deleteFile(exists);
  //   }
  //   const newImages = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_CERT, images);



  //   return await this.businessRepository.save({
  //     ...business,
  //     certificate: newImages
  //   })
  // }
  async uploadImageBusinessCertificate(business: Business, oldImageName: string[], images: Express.Multer.File[]): Promise<any> {
    const arrTemp: string[] = [];
    const deletePromises: Promise<void>[] = [];
  
    for (const oldImage of business.certificate) {
      if (oldImageName.includes(oldImage)) {
        arrTemp.push(oldImage);
        deletePromises.push(this.storageService.deleteFile(oldImage));
      }
    }
  
    await Promise.all(deletePromises);
  
    const newImages = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_CERT, images);
  
    return await this.businessRepository.save({
      ...business,
      certificate: newImages
    });
  }
  
  async uploadImageBusinessLicense(business: Business, oldImageName: string[], images: Express.Multer.File[]): Promise<any> {
    const arrTemp: string[] = [];
    const deletePromises: Promise<void>[] = [];
  
    for (const oldImage of business.licenseBusiness) {
      if (oldImageName.includes(oldImage)) {
        arrTemp.push(oldImage);
        deletePromises.push(this.storageService.deleteFile(oldImage));
      }
    }
  
    await Promise.all(deletePromises);
  
    const newImages = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_LICENSE, images);
  
    return await this.businessRepository.save({
      ...business,
      licenseBusiness: newImages
    });
  }
  async uploadImageBusinessInspection(business: Business, oldImageName: string[], images: Express.Multer.File[]): Promise<any> {
    const arrTemp: string[] = [];
    const deletePromises: Promise<void>[] = [];
  
    for (const oldImage of business.inspectionPhoto) {
      if (oldImageName.includes(oldImage)) {
        arrTemp.push(oldImage);
        deletePromises.push(this.storageService.deleteFile(oldImage));
      }
    }
  
    await Promise.all(deletePromises);
  
    const newImages = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_INSPECTION, images);
  
    return await this.businessRepository.save({
      ...business,
      inspectionPhoto: newImages
    });

  }
  async uploadImageBusinessAvatar(business: Business, oldImageName: string[], images: Express.Multer.File[]): Promise<any> {
    const arrTemp: string[] = [];
    const deletePromises: Promise<void>[] = [];
  
    for (const oldImage of business.avatar) {
      if (oldImageName.includes(oldImage)) {
        arrTemp.push(oldImage);
        deletePromises.push(this.storageService.deleteFile(oldImage));
      }
    }
  
    await Promise.all(deletePromises);
  
    const newImages = await this.storageService.uploadMultiFiles(ImageTypes.CARD_BUSINESS_AVATAR, images);
  
    return await this.businessRepository.save({
      ...business,
      certificate: newImages
    });

  }

  async updateImage(id: string, updateBusinessDto: UpdateImageBusinessDTO): Promise<Business> {
    const business = await this.findOne(id);
    var result: any;
    switch (updateBusinessDto.imageTypes) {
      case 'business-certificate':
        result = await this.uploadImageBusinessCertificate(business, business.certificate, updateBusinessDto.images)
        break;
      case 'business-license':
        result = await this.uploadImageBusinessLicense(business, business.licenseBusiness, updateBusinessDto.images)
        break;
      case 'business-inspection':
        result = await this.uploadImageBusinessInspection(business, business.inspectionPhoto, updateBusinessDto.images)
        break;
      case 'business-avatar':
        result = await this.uploadImageBusinessAvatar(business, business.avatar, updateBusinessDto.images)
        break;
      default:
        break;
    }
    return result
  }

  async remove(id: string): Promise<Object | Business> {
    const business = await this.findOne(id);
    await this.businessRepository.remove(business);
    return {
      message: `Deleted business with id ${id} successfully`
    }
  }
}
