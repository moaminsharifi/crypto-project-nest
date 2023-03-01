import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCurrenciesController } from './crypto-currencies.controller';
import { CryptoCurrenciesService } from './crypto-currencies.service';

describe('CryptoCurrenciesController', () => {
  let controller: CryptoCurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoCurrenciesController],
      providers: [CryptoCurrenciesService],
    }).compile();

    controller = module.get<CryptoCurrenciesController>(
      CryptoCurrenciesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
