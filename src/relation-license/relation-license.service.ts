import { Injectable } from '@nestjs/common';
import { CreateRelationLicenseDto } from './dto/create-relation-license.dto';
import { UpdateRelationLicenseDto } from './dto/update-relation-license.dto';

@Injectable()
export class RelationLicenseService {
  create(createRelationLicenseDto: CreateRelationLicenseDto) {
    return 'This action adds a new relationLicense';
  }

  findAll() {
    return `This action returns all relationLicense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relationLicense`;
  }

  update(id: number, updateRelationLicenseDto: UpdateRelationLicenseDto) {
    return `This action updates a #${id} relationLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} relationLicense`;
  }
}
