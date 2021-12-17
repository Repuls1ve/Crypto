import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { BithumbClient } from './api/bithumb.client';

@Injectable()
export class BithumbService implements ExchangeService {
  private readonly bithumb = new BithumbClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.bithumb.getAllTickers()
    const pairs = response.data
    const btc = await this.bithumb.getTicker('BTC-USDT')
    return pairs
    .filter(pair => pair.s.endsWith('USDT'))
    .map(pair => ({
      symbol: pair.s.replace('-USDT', ''),
      price: parseFloat(pair.c) / parseFloat(btc.data[0].c)
    }))
  }
}
