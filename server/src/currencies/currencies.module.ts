import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { BinanceService } from 'src/exchanges/binance/binance.service';
import { CoinbaseService } from 'src/exchanges/coinbase/coinbase.service';
import { FtxService } from 'src/exchanges/ftx/ftx.service';
import { KucoinService } from 'src/exchanges/kucoin/kucoin.service';
import { BitfinexService } from 'src/exchanges/bitfinex/bitfinex.service';
import { HitbtcService } from 'src/exchanges/hitbtc/hitbtc.service';
import { HuobiService } from 'src/exchanges/huobi/huobi.service';
import { PoloniexService } from 'src/exchanges/poloniex/poloniex.service';
import { BithumbService } from 'src/exchanges/bithumb/bithumb.service';
import { BkexService } from 'src/exchanges/bkex/bkex.service';

@Module({
  providers: [
    CurrenciesService,
    ExchangesService,
    BinanceService,
    CoinbaseService,
    FtxService,
    KucoinService,
    BitfinexService,
    HitbtcService,
    HuobiService,
    PoloniexService,
    BithumbService,
    BkexService
  ],
  controllers: [CurrenciesController]
})
export class CurrenciesModule {}
