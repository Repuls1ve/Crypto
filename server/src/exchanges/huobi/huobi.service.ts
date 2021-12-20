import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IBtcPairs, IPair } from 'src/interfaces/pairs.interface';
import { HuobiClient } from './api/huobi.client';

@Injectable()
export class HuobiService implements ExchangeService {
  private readonly huobi = new HuobiClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.huobi.getAllTickers()
    const pairs = response.data
    return pairs
    .filter(pair => pair.symbol.endsWith('btc'))
    .map(pair => ({
      symbol: pair.symbol.replace('btc', '').toUpperCase(),
      price: pair.close
    }))
  }

  async getBtcPairs(): Promise<IBtcPairs> {
    const btc = await this.huobi.getTicker('btcusdt')
    return {
      'USDT': btc.tick.close
    }
  }
}
