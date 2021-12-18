import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { BkexClient } from './api/bkex.client';

@Injectable()
export class BkexService implements ExchangeService {
  private readonly bkex = new BkexClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.bkex.getAllTickers()
    const pairs = response.data
    const btc = await this.bkex.getTicker('BTC_USDT')
    return pairs
    .filter(pair => pair.symbol.endsWith('USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('_USDT', ''),
      price: pair.close / btc.data[0].close
    }))
  }
}
