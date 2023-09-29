import { Test, TestingModule } from '@nestjs/testing';
import { RelationLicenseController } from './relation-license.controller';
import { RelationLicenseService } from './relation-license.service';

describe('RelationLicenseController', () => {
  let controller: RelationLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationLicenseController],
      providers: [RelationLicenseService],
    }).compile();

    controller = module.get<RelationLicenseController>(RelationLicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
