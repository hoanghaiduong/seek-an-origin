import { Test, TestingModule } from '@nestjs/testing';
import { AddtionalLicenseController } from './addtional-license.controller';
import { AddtionalLicenseService } from './addtional-license.service';

describe('AddtionalLicenseController', () => {
  let controller: AddtionalLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddtionalLicenseController],
      providers: [AddtionalLicenseService],
    }).compile();

    controller = module.get<AddtionalLicenseController>(AddtionalLicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
