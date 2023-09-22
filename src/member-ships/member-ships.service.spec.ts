import { Test, TestingModule } from '@nestjs/testing';
import { MemberShipsService } from './member-ships.service';

describe('MemberShipsService', () => {
  let service: MemberShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberShipsService],
    }).compile();

    service = module.get<MemberShipsService>(MemberShipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
