import { Test, TestingModule } from '@nestjs/testing';
import { MemberShipsController } from './member-ships.controller';
import { MemberShipsService } from './member-ships.service';

describe('MemberShipsController', () => {
  let controller: MemberShipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberShipsController],
      providers: [MemberShipsService],
    }).compile();

    controller = module.get<MemberShipsController>(MemberShipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
