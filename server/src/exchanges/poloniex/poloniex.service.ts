import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { PoloniexClient } from './api/poloniex.client';

@Injectable()
export class PoloniexService implements ExchangeService {
  private readonly poloniex = new PoloniexClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.poloniex.getAllTickers()
    const btc = await this.poloniex.getTicker('USDT_BTC')
    return Object.keys(pairs)
    .filter(symbol => symbol.startsWith('USDT'))
    .map(symbol => ({
      symbol: symbol.replace('USDT_', ''),
      price: parseFloat(pairs[symbol].last) / parseFloat(btc.last),
      volume: parseFloat(pairs[symbol].baseVolume)
    }))
  }
}
