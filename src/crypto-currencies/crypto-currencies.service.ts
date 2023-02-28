import { Injectable } from '@nestjs/common';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dto/update-crypto-currency.dto';

@Injectable()
export class CryptoCurrenciesService {
  create(createCryptoCurrencyDto: CreateCryptoCurrencyDto) {
    return {
      id: 2,
      name: 'BTC',
      description: 'LoremIpsom',
    };
  }

  findAll() {
    return `This action returns all cryptoCurrencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoCurrency`;
  }

  update(id: number, updateCryptoCurrencyDto: UpdateCryptoCurrencyDto) {
    return `This action updates a #${id} cryptoCurrency`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoCurrency`;
  }
}
