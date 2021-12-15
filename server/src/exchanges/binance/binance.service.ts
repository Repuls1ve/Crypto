import { Injectable } from '@nestjs/common';
import Binance from 'binance-api-node';
import { IPair } from 'src/interfaces/pairs.interface';

@Injectable()
export class BinanceService {
  private readonly binance = Binance()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.binance.prices()
    return Object.keys(pairs)
    .filter(pair => pair.includes('BTC'))
    .map(pair => ({
      symbol: pair.replace('BTC', ''),
      price: parseFloat(pairs[pair])
    }))
  }
}