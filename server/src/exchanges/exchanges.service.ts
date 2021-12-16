import { Injectable } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { CoinbaseService } from './coinbase/coinbase.service';
import { FtxService } from './ftx/ftx.service';
import { KucoinService } from './kucoin/kucoin.service';

@Injectable()
export class ExchangesService {
  constructor(
    public readonly binance: BinanceService,
    public readonly coinbase: CoinbaseService,
    public readonly ftx: FtxService,
    public readonly kucoin: KucoinService
  ) {}
}
