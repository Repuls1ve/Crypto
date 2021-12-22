import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { CoinexClient } from './api/coinex.client';

@Injectable()
export class CoinexService implements ExchangeService {
  private readonly coinex = new CoinexClient()

  async getPairs(): Promise<IPair[]> {
    const response = await this.coinex.getAllTickers()
    const pairs = response.data.ticker
    const btc = (await this.coinex.getTicker('BTCUSDT')).data.ticker
    return Object.keys(pairs)
    .filter(symbol => symbol.endsWith('USDT'))
    .map(symbol => ({
      symbol: symbol.replace('USDT', ''),
      price: parseFloat(pairs[symbol].last) / parseFloat(btc.last),
      volume: parseFloat(pairs[symbol].vol) * parseFloat(pairs[symbol].last)
    }))
  }
}
