import { Test, TestingModule } from '@nestjs/testing';
import { ProductionAreaController } from './production-area.controller';
import { ProductionAreaService } from './production-area.service';

describe('ProductionAreaController', () => {
  let controller: ProductionAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionAreaController],
      providers: [ProductionAreaService],
    }).compile();

    controller = module.get<ProductionAreaController>(ProductionAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
