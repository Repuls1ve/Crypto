import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { BybitClient } from './api/bybit.client';

@Injectable()
export class BybitService implements ExchangeService {
  private readonly bybit = new BybitClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.bybit.getAllTickers()
    const pairs = response.result
    const btc = ((await this.bybit.getTicker('BTCUSDT')).result[0])
    return pairs
    .filter(pair => pair.symbol.endsWith('USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('USDT', ''),
      price: parseFloat(pair.last_price) / parseFloat(btc.last_price),
      volume: pair.volume_24h * parseFloat(pair.last_price)
    }))
  }
}
