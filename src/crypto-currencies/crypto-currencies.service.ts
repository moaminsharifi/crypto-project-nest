import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dto/update-crypto-currency.dto';
import { CryptoCurrency } from './entities/crypto-currency.entity';

@Injectable()
export class CryptoCurrenciesService {
  constructor(
    @InjectRepository(CryptoCurrency)
    private cryptoRepo: Repository<CryptoCurrency>,
  ) {}

  /* 
   Action:
      - insert new currency
      - return inserted currency
  */
  async create(createCryptoCurrencyDto: CreateCryptoCurrencyDto) {
    const userExists = await this.cryptoRepo.findOne({
      where: {
        name: createCryptoCurrencyDto.name,
      },
    });

    if (userExists) {
      throw new ConflictException();
    } else {
      const newCrypto = this.cryptoRepo.create({
        ...createCryptoCurrencyDto,
        created_at: new Date(),
      });
      return this.cryptoRepo.save(newCrypto);
    }
  }

  /* 
   Action: return all currencies
  */
  findAll() {
    return this.cryptoRepo.find();
  }

  /* 
   Action: return selected currency
  */
  findOne(id: number) {
    return this.cryptoRepo.findOneBy({ id });
  }

  /* 
   Action:
      - update currency
      - return updated curreny
  */
  async update(id: number, updateCryptoCurrencyDto: UpdateCryptoCurrencyDto) {
    const user = await this.findOne(id);
    return user
      ? this.cryptoRepo.save({ ...user, ...updateCryptoCurrencyDto })
      : this.CustomNotFoundException();
  }

  /* 
   Action:
      - remove
      - return removed curreny
    Exceptions:
      - :id not found -> 404 not found error
  */
  async remove(id: number) {
    const user = await this.findOne(id);
    const removeResult = await this.cryptoRepo.delete(id);

    return removeResult.affected != 0
      ? { ...user, deleted_at: new Date() }
      : this.CustomNotFoundException();
  }

  CustomNotFoundException() {
    throw new NotFoundException();
  }
}
