import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { HooClient } from './api/hoo.client';

@Injectable()
export class HooService implements ExchangeService {
  private readonly hoo = new HooClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.hoo.getAllTickers()
    const btc = await this.hoo.getTicker('BTC-USDT')
    const pairs = response.data
    return pairs
    .filter(pair => pair.symbol.endsWith('-USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('-USDT', ''),
      price: parseFloat(pair.price) / parseFloat(btc.data[0].price),
      volume: parseFloat(pair.volume) * parseFloat(pair.price)
    }))
  }
}
