import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeDto } from 'src/trade/dto/create-trade.dto';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';

@Injectable()
export class TradeService {
  // inject `Trade` Repo to comunicate between server and database.trades
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,
  ) {}

  /* 
   Action:
      - insert new trade record
  */
  async createTrade(createTradeDto: CreateTradeDto) {
    const currency = await this.tradeRepo.findOneBy({
      id: createTradeDto.currencyId,
    });
    const trade = this.tradeRepo.create({
      price: createTradeDto.price,
      currency,
      trade_at: new Date(),
    });

    return this.tradeRepo.save(trade);
  }

  /* 
   Action: return all currencies
  */
  findAll() {
    return this.tradeRepo.find();
  }

  /* 
   Action: return latesTradePrice from DB
  */
  async GetPrices(limit: number) {
    return await this.tradeRepo
      .createQueryBuilder('trades')
      .orderBy('trades.trade_at')
      // .distinctOn(['trades.currencyId'])
      .limit(limit)
      .getMany();
  }
}
