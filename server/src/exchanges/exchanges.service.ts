import { Injectable } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { CoinbaseService } from './coinbase/coinbase.service';

@Injectable()
export class ExchangesService {
  constructor(
    public readonly binance: BinanceService,
    public readonly coinbase: CoinbaseService
  ) {}
}
