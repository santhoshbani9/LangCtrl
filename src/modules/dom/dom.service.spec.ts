import { Test, TestingModule } from '@nestjs/testing';
import { DomService } from './dom.service';

describe('DomService', () => {
  let service: DomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomService],
    }).compile();

    service = module.get<DomService>(DomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
