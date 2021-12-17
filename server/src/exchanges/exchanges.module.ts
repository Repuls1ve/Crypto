import { Module } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { CoinbaseService } from './coinbase/coinbase.service';
import { ExchangesService } from './exchanges.service';
import { FtxService } from './ftx/ftx.service';
import { KucoinService } from './kucoin/kucoin.service';
import { BitfinexService } from './bitfinex/bitfinex.service';
import { HitbtcService } from './hitbtc/hitbtc.service';
import { HuobiService } from './huobi/huobi.service';

@Module({
  providers: [
    BinanceService,
    CoinbaseService,
    ExchangesService,
    FtxService,
    KucoinService,
    BitfinexService,
    HitbtcService,
    HuobiService
  ]
})
export class ExchangesModule {}
