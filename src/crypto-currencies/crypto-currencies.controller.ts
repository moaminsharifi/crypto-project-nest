import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CryptoCurrenciesService } from './crypto-currencies.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dto/update-crypto-currency.dto';
import { CryptoCurrency } from './entities/crypto-currency.entity';

@ApiTags('Crypto Currency Manager')
@Controller('crypto-currencies')
export class CryptoCurrenciesController {
  // Add resource sevice to class instance after constructed
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
  create(@Body() createCryptoCurrencyDto: CreateCryptoCurrencyDto) {
    return this.cryptoCurrenciesService.create(createCryptoCurrencyDto);
  }

  /*
    Duty: Get All Currencies
    Method: Get
    Route: /crypto-currencies
  */
  @Get()
  @ApiOkResponse({ type: CryptoCurrency, isArray: true })
  findAll() {
    return this.cryptoCurrenciesService.findAll();
  }

  /*
    Duty: Get single Currency
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
    Duty: Update Selected Currency
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
    Duty: Delete Selected Currency
    Method: Delete
    Route: /crypto-currencies/:id
  */
  @ApiOkResponse({ type: CryptoCurrency })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cryptoCurrenciesService.remove(id);
  }
}
