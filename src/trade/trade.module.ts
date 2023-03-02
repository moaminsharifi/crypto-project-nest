import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade])],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
