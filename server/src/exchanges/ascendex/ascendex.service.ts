import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { AscendexClient } from './api/ascendex.client';

@Injectable()
export class AscendexService implements ExchangeService {
  private readonly ascendex = new AscendexClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.ascendex.getAllTickers()
    const pairs = response.data
    const btc = (await this.ascendex.getTicker('BTC/USDT')).data
    return pairs
    .filter(pair => pair.symbol.endsWith('/USDT'))
    .map(pair => ({
      symbol: pair.symbol.replace('/USDT', ''),
      price: parseFloat(pair.close) / parseFloat(btc.close),
      volume: parseFloat(pair.volume) * parseFloat(pair.close)
    }))
  }
}
