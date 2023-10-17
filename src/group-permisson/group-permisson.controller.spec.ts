import { Test, TestingModule } from '@nestjs/testing';
import { GroupPermissonController } from './group-permisson.controller';
import { GroupPermissonService } from './group-permisson.service';

describe('GroupPermissonController', () => {
  let controller: GroupPermissonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupPermissonController],
      providers: [GroupPermissonService],
    }).compile();

    controller = module.get<GroupPermissonController>(GroupPermissonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
