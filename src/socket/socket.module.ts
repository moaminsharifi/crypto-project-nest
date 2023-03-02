import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { CryptoCurrenciesModule } from 'src/crypto-currencies/crypto-currencies.module';
import { TradeModule } from 'src/trade/trade.module';

@Module({
  imports: [CryptoCurrenciesModule, TradeModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
