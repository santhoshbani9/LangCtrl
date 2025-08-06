import { Test, TestingModule } from '@nestjs/testing';
import { ScreenshotterService } from './screenshotter.service';

describe('ScreenshotterService', () => {
  let service: ScreenshotterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenshotterService],
    }).compile();

    service = module.get<ScreenshotterService>(ScreenshotterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
