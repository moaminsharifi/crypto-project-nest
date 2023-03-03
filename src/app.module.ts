import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoCurrenciesModule } from './crypto-currencies/crypto-currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/dataSource';
import { SocketModule } from './socket/socket.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    CryptoCurrenciesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    SocketModule,
    TradeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
