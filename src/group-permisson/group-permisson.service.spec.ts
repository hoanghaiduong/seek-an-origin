import { Test, TestingModule } from '@nestjs/testing';
import { GroupPermissonService } from './group-permisson.service';

describe('GroupPermissonService', () => {
  let service: GroupPermissonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupPermissonService],
    }).compile();

    service = module.get<GroupPermissonService>(GroupPermissonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
