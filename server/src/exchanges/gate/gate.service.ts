import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { GateClient } from './api/gate.client';

@Injectable()
export class GateService implements ExchangeService {
  private readonly gate = new GateClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.gate.getAllTickers()
    const btc = await this.gate.getTicker('BTC_USDT')
    return pairs
    .filter(pair => pair.currency_pair.endsWith('_USDT'))
    .map(pair => ({
      symbol: pair.currency_pair.replace('_USDT', ''),
      price: parseFloat(pair.last) / parseFloat(btc[0].last),
      volume: parseFloat(pair.quote_volume)
    }))
  }
}
