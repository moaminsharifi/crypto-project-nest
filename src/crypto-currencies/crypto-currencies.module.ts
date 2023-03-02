import { Module } from '@nestjs/common';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { CryptoCurrenciesController } from './crypto-currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCurrency } from './entities/crypto-currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoCurrency])],
  controllers: [CryptoCurrenciesController],
  providers: [CryptoCurrenciesService],
  exports: [CryptoCurrenciesService],
})
export class CryptoCurrenciesModule {}
