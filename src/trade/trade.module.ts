import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { CryptoCurrenciesModule } from 'src/crypto-currencies/crypto-currencies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trade]), CryptoCurrenciesModule],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
