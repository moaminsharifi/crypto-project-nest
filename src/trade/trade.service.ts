import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeDto } from 'src/trade/dto/create-trade.dto';
import { Repository } from 'typeorm';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { Trade } from './entities/trade.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class TradeService {
  // inject `Trade` Repo to comunicate    server and database.trades
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly cryptoCurrenciesService: CryptoCurrenciesService,
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
   Action: return all currencies trade
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

  /* 
   Action: return all currencies
  */
  async findAllWithInfo() {
    const fullCurrenciesResponse = [];
    const currencies = await this.cryptoCurrenciesService.findAll();

    currencies.forEach(async (currency) => {
      const cacheValues: any = await this.cacheManager.get(
        currency.id.toString(),
      );
      fullCurrenciesResponse.push({
        price: cacheValues === undefined ? '-' : cacheValues.price,
        trade_at: cacheValues === undefined ? '-' : cacheValues.trade_at,
        id: currency.id,
        name: currency.name,
        description: currency.description,
        email: currency.email,
      });
    });
    return fullCurrenciesResponse;
  }
}
