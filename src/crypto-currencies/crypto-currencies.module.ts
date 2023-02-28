import { Module } from '@nestjs/common';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { CryptoCurrenciesController } from './crypto-currencies.controller';

@Module({
  controllers: [CryptoCurrenciesController],
  providers: [CryptoCurrenciesService]
})
export class CryptoCurrenciesModule {}
