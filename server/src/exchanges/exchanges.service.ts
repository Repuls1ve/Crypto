import { Injectable } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { BitfinexService } from './bitfinex/bitfinex.service';
import { BithumbService } from './bithumb/bithumb.service';
import { BkexService } from './bkex/bkex.service';
import { CoinbaseService } from './coinbase/coinbase.service';
import { FtxService } from './ftx/ftx.service';
import { HitbtcService } from './hitbtc/hitbtc.service';
import { HuobiService } from './huobi/huobi.service';
import { KucoinService } from './kucoin/kucoin.service';
import { PoloniexService } from './poloniex/poloniex.service';

@Injectable()
export class ExchangesService {
  constructor(
    public readonly binance: BinanceService,
    public readonly coinbase: CoinbaseService,
    public readonly ftx: FtxService,
    public readonly kucoin: KucoinService,
    public readonly bitfinex: BitfinexService,
    public readonly hitbtc: HitbtcService,
    public readonly huobi: HuobiService,
    public readonly poloniex: PoloniexService,
    public readonly bithumb: BithumbService,
    public readonly bkex: BkexService
  ) {}
}
