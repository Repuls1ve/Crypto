import { Injectable } from '@nestjs/common';
import Binance from 'binance-api-node';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';

@Injectable()
export class BinanceService implements ExchangeService {
  private readonly binance = Binance()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.binance.prices()
    return Object.keys(pairs)
    .filter(pair => pair.endsWith('BTC'))
    .map(pair => ({
      symbol: pair.replace('BTC', ''),
      price: parseFloat(pairs[pair])
    }))
  }
}