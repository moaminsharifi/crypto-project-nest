import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { TradeService } from 'src/trade/trade.service';
import { Cache } from 'cache-manager';

@Injectable()
export class SocketService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cryptoCurrenciesService: CryptoCurrenciesService,
    private readonly tradeService: TradeService,
  ) {}

  async insertFakeTrades(): Promise<void> {
    const currencies = await this.cryptoCurrenciesService.findAll();
    let meta: any;

    currencies.forEach(async (currency) => {
      meta = {
        price: Math.floor(90 + Math.random() * 20),
        currencyId: currency.id,
      };
      const tradeRes = await this.tradeService.createTrade(meta);

      await this.cacheManager.set(currency.id.toString(), {
        price: tradeRes.price,
        trade_at: tradeRes.trade_at,
      });
    });
  }

  async calculatePriceList() {
    return await this.tradeService.GetPrices(5);
  }
}
