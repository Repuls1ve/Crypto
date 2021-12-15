import { Module } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { CoinbaseService } from './coinbase/coinbase.service';
import { ExchangesService } from './exchanges.service';

@Module({
  providers: [
    BinanceService,
    CoinbaseService,
    ExchangesService
  ]
})
export class ExchangesModule {}
