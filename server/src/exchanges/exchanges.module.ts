import { Module } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { CoinbaseService } from './coinbase/coinbase.service';
import { ExchangesService } from './exchanges.service';
import { FtxService } from './ftx/ftx.service';
import { KucoinService } from './kucoin/kucoin.service';
import { BitfinexService } from './bitfinex/bitfinex.service';
import { HitbtcService } from './hitbtc/hitbtc.service';
import { HuobiService } from './huobi/huobi.service';
import { PoloniexService } from './poloniex/poloniex.service';
import { BithumbService } from './bithumb/bithumb.service';
import { BkexService } from './bkex/bkex.service';
import { CoinexService } from './coinex/coinex.service';
import { GarantexService } from './garantex/garantex.service';
import { BybitService } from './bybit/bybit.service';
import { AscendexService } from './ascendex/ascendex.service';

@Module({
  providers: [
    BinanceService,
    CoinbaseService,
    ExchangesService,
    FtxService,
    KucoinService,
    BitfinexService,
    HitbtcService,
    HuobiService,
    PoloniexService,
    BithumbService,
    BkexService,
    CoinexService,
    GarantexService,
    BybitService,
    AscendexService
  ]
})
export class ExchangesModule {}
