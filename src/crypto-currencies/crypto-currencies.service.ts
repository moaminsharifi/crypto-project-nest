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
  // inject `CryptoCurrency` Repo to comunicate between server and database
  constructor(
    @InjectRepository(CryptoCurrency)
    private cryptoRepo: Repository<CryptoCurrency>,
  ) {}

  /* 
   Action:
      - insert new currency
      - return inserted currency
    Exception:
      - Currency not found (base on `db.name` column):
          - throw `conflictException - 409`
  */
  async create(createCryptoCurrencyDto: CreateCryptoCurrencyDto) {
    // Step01 - try to get currency by `name` to check if exists
    const currencyExists = await this.cryptoRepo.findOne({
      where: {
        name: createCryptoCurrencyDto.name,
      },
    });

    if (currencyExists) {
      // Step02_1 - if currency exists, return `409 - conflict` response to client
      throw new ConflictException();
    } else {
      /* 
      Step02_2 - if currency does not exists:
        - create currency
      */
      const newCrypto = this.cryptoRepo.create({
        ...createCryptoCurrencyDto,
        created_at: new Date(),
      });

      /* 
      Step3
        - save `currency` to `db.currencies`
        - return `currency` with `200 status code`
      */
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
    Exceptions:
      - if currency not found:
        - throw `NotFoundException - 404`
  */
  async update(id: number, updateCryptoCurrencyDto: UpdateCryptoCurrencyDto) {
    // Step01 -> try to find currency base on id
    const user = await this.findOne(id);

    /*
      Step02:
        - if currency exists:
          - Update currency
          - Save to DB
          - return Updated currency to user
        - if currency NOT exists:
          - throw `NotFoundException - 404`
    */
    return user
      ? this.cryptoRepo.save({ ...user, ...updateCryptoCurrencyDto })
      : this.CustomNotFoundException();
  }

  /* 
   Action:
      - remove
      - return removed curreny to client
    Exceptions:
      - :id not found -> 404 not found error
  */
  async remove(id: number) {
    // Step01 -> try to find currency base on id
    const currency = await this.findOne(id);

    /*
      Step02:
        - if currency exists in DB:
          - hard delete currency from DB
          - return deleted currency to user with `deleted_at: Date`
        - if currency NOT exists in DB:
          - throw `NotFoundException - 404`
    */
    if (currency) {
      await this.cryptoRepo.delete(id);
      return { ...currency, deleted_at: new Date() };
    } else {
      throw new NotFoundException();
    }
  }

  // Action: throw `NotFoundException` for inline rules
  CustomNotFoundException() {
    throw new NotFoundException();
  }
}
