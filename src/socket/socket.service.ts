import { Injectable } from '@nestjs/common';
import { CryptoCurrenciesService } from 'src/crypto-currencies/crypto-currencies.service';
import { TradeService } from 'src/trade/trade.service';

@Injectable()
export class SocketService {
  constructor(
    private readonly cryptoCurrenciesService: CryptoCurrenciesService,
    private readonly tradeService: TradeService,
  ) {}

  async insertFakeTrades(): Promise<any> {
    const currencies = await this.cryptoCurrenciesService.findAll();
    let price: number;
    const metas = [];
    let meta: any;
    currencies.forEach((currency) => {
      price = Math.floor(90 + Math.random() * 20);
      meta = { price, currencyId: currency.id };
      metas.push(meta);
      this.tradeService.createTrade(meta);
    });
    return metas;
  }

  async calculatePriceList() {
    return await this.tradeService.GetPrices(5);
  }
}
