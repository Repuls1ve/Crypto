import { Controller, Get } from '@nestjs/common';
import { ICurrency } from 'src/interfaces/currency.interface';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencies: CurrenciesService) {}

  @Get()
  async getCurrencies(): Promise<ICurrency[]> {
    return await this.currencies.getCurrencies()
  }

  @Get('significant')
  async getSignificantCurrencies(): Promise<ICurrency[]> {
    return await this.currencies.getSignificantCurrencies()
  }
}
