import { Test, TestingModule } from '@nestjs/testing';
import { UnitTypeController } from './unit-type.controller';
import { UnitTypeService } from './unit-type.service';

describe('UnitTypeController', () => {
  let controller: UnitTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitTypeController],
      providers: [UnitTypeService],
    }).compile();

    controller = module.get<UnitTypeController>(UnitTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
