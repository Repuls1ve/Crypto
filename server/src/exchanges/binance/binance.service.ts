import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { BinanceClient } from './api/binance.client';

@Injectable()
export class BinanceService implements ExchangeService {
  private readonly binance = new BinanceClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.binance.getAllTickers()
    const btc = await this.binance.getTicker('BTCUSDT')
    return pairs
    .filter(pair => pair.symbol.endsWith('BTC'))
    .map(pair => ({
      symbol: pair.symbol.replace('BTC', ''),
      price: parseFloat(pair.lastPrice),
      volume: parseFloat(pair.quoteVolume) * parseFloat(btc.lastPrice)
    }))
  }
}