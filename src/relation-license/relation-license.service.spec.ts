import { Test, TestingModule } from '@nestjs/testing';
import { RelationLicenseService } from './relation-license.service';

describe('RelationLicenseService', () => {
  let service: RelationLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationLicenseService],
    }).compile();

    service = module.get<RelationLicenseService>(RelationLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
