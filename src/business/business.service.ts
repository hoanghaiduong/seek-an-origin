import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeModelService } from 'src/type-model/type-model.service';
import { TypeModel } from 'src/type-model/entities/type-model.entity';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';

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

  findAll() {
    return `This action returns all business`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
