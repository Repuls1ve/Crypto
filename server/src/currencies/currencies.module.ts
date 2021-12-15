import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { BinanceService } from 'src/exchanges/binance/binance.service';
import { CoinbaseService } from 'src/exchanges/coinbase/coinbase.service';

@Module({
  providers: [
    CurrenciesService,
    ExchangesService,
    BinanceService,
    CoinbaseService
  ],
  controllers: [CurrenciesController]
})
export class CurrenciesModule {}
