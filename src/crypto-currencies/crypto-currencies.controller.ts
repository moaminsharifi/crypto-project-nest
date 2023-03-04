import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dto/update-crypto-currency.dto';
import { CryptoCurrency } from './entities/crypto-currency.entity';
import { DeleteCryptoCurrency } from './entities/delete-crypto-currency.entity';

@ApiTags('Crypto Currency Manager')
@Controller('crypto-currencies')
export class CryptoCurrenciesController {
  // Add crypto-currenies sevice to class instance after constructed
  constructor(
    private readonly cryptoCurrenciesService: CryptoCurrenciesService,
  ) {}

  /*
    Action:
      - Insert new Currency if not exists
      - throw conflict exception if exists
    Method: Post
    Route: /crypto-currencies
  */
  @Post()
  @ApiCreatedResponse({ type: CryptoCurrency })
  @ApiNotFoundResponse({
    description: 'nest.js default `notFoundException 404`',
  })
  create(@Body() createCryptoCurrencyDto: CreateCryptoCurrencyDto) {
    return this.cryptoCurrenciesService.create(createCryptoCurrencyDto);
  }

  /*
    Action: Get All Currencies
    Method: Get
    Route: /crypto-currencies
  */
  @Get()
  @ApiOkResponse({ type: CryptoCurrency, isArray: true })
  findAll() {
    return this.cryptoCurrenciesService.findAll();
  }

  /*
    Action:
      - Get single Currency if not exists
      - throw 404 not found exception if not exists
    Method: Get
    Route: /crypto-currencies/:id
  */
  @Get(':id')
  @ApiOkResponse({ type: CryptoCurrency })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const currency = await this.cryptoCurrenciesService.findOne(id);
    if (currency) {
      return currency;
    } else {
      throw new NotFoundException();
    }
  }
  /*
    Action:
      - Update Selected Currency if exists
      - throw 404 not found exception if not exists
    Method: Patch
    Route: /crypto-currencies/:id
  */
  @Patch(':id')
  @ApiOkResponse({ type: CryptoCurrency })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCryptoCurrencyDto: UpdateCryptoCurrencyDto,
  ) {
    return this.cryptoCurrenciesService.update(id, updateCryptoCurrencyDto);
  }

  /*
    Action:
      - Delete Selected Currency if exists
      - throw 404 not found exception if not exists
    Method: Delete
    Route: /crypto-currencies/:id
  */
  @ApiOkResponse({ type: DeleteCryptoCurrency })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cryptoCurrenciesService.remove(id);
  }
}
