import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dto/update-crypto-currency.dto';
import { CryptoCurrency } from './entities/crypto-currency.entity';

@ApiTags('Crypto Currency Manager')
@Controller('crypto-currencies')
export class CryptoCurrenciesController {
  constructor(
    private readonly cryptoCurrenciesService: CryptoCurrenciesService,
  ) {}

  /*
    Duty: Insert new Currencies
    Method: Post
    Route: /crypto-currencies
  */
  @Post()
  @ApiCreatedResponse({ type: CryptoCurrency })
  create(
    @Body() createCryptoCurrencyDto: CreateCryptoCurrencyDto,
  ): CryptoCurrency {
    return {
      id: 2,
      email: 'kiaras@fmail.com',
      name: 'BTC',
      description: 'LoremIpsom',
      last_trade_price: 2.0,
      created_at: new Date(),
      last_trade_date: new Date(),
    };
  }

  /*
    Duty: Get All Currencies
    Method: Get
    Route: /crypto-currencies
  */
  @Get()
  @ApiOkResponse({ type: CryptoCurrency, isArray: true })
  findAll(): CryptoCurrency[] {
    return [];
  }

  /*
    Duty: Get single Currency
    Method: Get
    Route: /crypto-currencies/:id
  */
  @Get(':id')
  @ApiOkResponse({ type: CryptoCurrency })
  findOne(@Param('id') id: string): CryptoCurrency {
    return {
      id: 2,
      email: 'kiaras@fmail.com',
      name: 'BTC',
      description: 'LoremIpsom',
      last_trade_price: 2.0,
      created_at: new Date(),
      last_trade_date: new Date(),
    };
  }

  /*
    Duty: Update Selected Currency
    Method: Patch
    Route: /crypto-currencies/:id
  */
  @Patch(':id')
  @ApiOkResponse({ type: CryptoCurrency })
  update(
    @Param('id') id: string,
    @Body() updateCryptoCurrencyDto: UpdateCryptoCurrencyDto,
  ): CryptoCurrency {
    return {
      id: 2,
      email: 'kiaras@fmail.com',
      name: 'BTC',
      description: 'LoremIpsom',
      last_trade_price: 2.0,
      created_at: new Date(),
      last_trade_date: new Date(),
    };
  }

  /*
    Duty: Delete Selected Currency
    Method: Delete
    Route: /crypto-currencies/:id
  */
  @ApiOkResponse({ type: CryptoCurrency })
  @Delete(':id')
  remove(@Param('id') id: string): CryptoCurrency {
    // return this.cryptoCurrenciesService.remove(+id);
    return {
      id: 2,
      email: 'kiaras@fmail.com',
      name: 'BTC',
      description: 'LoremIpsom',
      last_trade_price: 2.0,
      created_at: new Date(),
      last_trade_date: new Date(),
    };
  }
}
