import { Controller, Get, Query } from '@nestjs/common';
import { ICurrencies, ICurrenciesDifferences } from 'src/interfaces/currency.interface';
import { IPagination, IPaginationParams } from 'src/interfaces/pagination.interface';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencies: CurrenciesService) {}

  @Get()
  getCurrencies(): ICurrencies {
    return this.currencies.getCurrencies()
  }

  @Get('differences')
  getDifferencies(): ICurrenciesDifferences {
    return this.currencies.getDifferences()
  }

  @Get('differences/pagination')  
  getDifferenciesPagination(@Query() params: IPaginationParams): IPagination<ICurrenciesDifferences> {
    return this.currencies.getDifferencesPaginated(params)
  }
}
