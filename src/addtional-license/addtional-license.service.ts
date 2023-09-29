import { Injectable } from '@nestjs/common';
import { CreateAddtionalLicenseDto } from './dto/create-addtional-license.dto';
import { UpdateAddtionalLicenseDto } from './dto/update-addtional-license.dto';

@Injectable()
export class AddtionalLicenseService {
  create(createAddtionalLicenseDto: CreateAddtionalLicenseDto) {
    return 'This action adds a new addtionalLicense';
  }

  findAll() {
    return `This action returns all addtionalLicense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addtionalLicense`;
  }

  update(id: number, updateAddtionalLicenseDto: UpdateAddtionalLicenseDto) {
    return `This action updates a #${id} addtionalLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} addtionalLicense`;
  }
}
