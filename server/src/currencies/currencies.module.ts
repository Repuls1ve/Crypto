import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { ExchangesService } from 'src/exchanges/exchanges.service';

@Module({
  providers: [CurrenciesService, ExchangesService],
  controllers: [CurrenciesController]
})
export class CurrenciesModule {}
