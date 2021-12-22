import { Injectable } from '@nestjs/common';
import { HitbtcClient } from './api/hitbtc.client'; 
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';

@Injectable()
export class HitbtcService implements ExchangeService {
  private readonly hitbtc = new HitbtcClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.hitbtc.getAllTickers()
    const btc = await this.hitbtc.getTicker('BTCUSDT')

    return Object.keys(pairs)
    .filter(symbol => symbol.endsWith('BTC'))
    .map(symbol => ({
      symbol: symbol.replace('BTC', ''),
      price: parseFloat(pairs[symbol].last),
      volume: parseFloat(pairs[symbol].volume_quote) * parseFloat(btc.last)
    }))
  }
}
