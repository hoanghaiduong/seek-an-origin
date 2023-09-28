import { Test, TestingModule } from '@nestjs/testing';
import { ProductionAreaService } from './production-area.service';

describe('ProductionAreaService', () => {
  let service: ProductionAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionAreaService],
    }).compile();

    service = module.get<ProductionAreaService>(ProductionAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
