import { Test, TestingModule } from '@nestjs/testing';
import { AddtionalLicenseService } from './addtional-license.service';

describe('AddtionalLicenseService', () => {
  let service: AddtionalLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddtionalLicenseService],
    }).compile();

    service = module.get<AddtionalLicenseService>(AddtionalLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
