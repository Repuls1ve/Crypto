import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { MexcClient } from './api/mexc.client';

@Injectable()
export class MexcService implements ExchangeService {
  private readonly mexc = new MexcClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.mexc.getAllTickers()
    const pairs = response.data
    const btc = await this.mexc.getTicker('BTC_USDT')
    return pairs
    .filter(pair => pair.symbol.endsWith('_USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('_USDT', ''),
      price: parseFloat(pair.last) / parseFloat(btc.data[0].last),
      volume: parseFloat(pair.volume) * parseFloat(pair.last) 
    }))
  }
}
