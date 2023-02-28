import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoCurrenciesModule } from './crypto-currencies/crypto-currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CryptoCurrenciesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
