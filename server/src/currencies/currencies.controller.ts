import { Controller, Get } from '@nestjs/common';
import { ICurrencies, ICurrenciesDifferences } from 'src/interfaces/currency.interface';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencies: CurrenciesService) {}

  @Get()
  getCurrencies(): ICurrencies {
    return this.currencies.getCurrencies()
  }

  @Get('differences')
  getCurrenciesDifferencies(): ICurrenciesDifferences {
    return this.currencies.getCurrenciesDifferences()
  }
}
