import { Injectable } from '@nestjs/common';
import { KucoinClient } from './api/kucoin.client';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';

@Injectable()
export class KucoinService implements ExchangeService {
  private readonly kucoin = new KucoinClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.kucoin.getAllTickers()
    const pairs = response.data.ticker
    const btc = ((await this.kucoin.getTicker('BTC-USDT')).data)
    return pairs
    .filter(pair => pair.symbol.includes('-USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('-USDT', ''),
      price: parseFloat(pair.last) / parseFloat(btc.last),
      volume: parseFloat(pair.volValue)
    }))
  }
}
