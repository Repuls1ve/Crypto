import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { BinanceService } from 'src/exchanges/binance/binance.service';
import { CoinbaseService } from 'src/exchanges/coinbase/coinbase.service';
import { FtxService } from 'src/exchanges/ftx/ftx.service';
import { KucoinService } from 'src/exchanges/kucoin/kucoin.service';
import { BitfinexService } from 'src/exchanges/bitfinex/bitfinex.service';

@Module({
  providers: [
    CurrenciesService,
    ExchangesService,
    BinanceService,
    CoinbaseService,
    FtxService,
    KucoinService,
    BitfinexService
  ],
  controllers: [CurrenciesController]
})
export class CurrenciesModule {}
