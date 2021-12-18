import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { GarantexClient } from './api/garantex.client';

@Injectable()
export class GarantexService implements ExchangeService {
  private readonly garantex = new GarantexClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.garantex.getAllTickers()
    const btc = await this.garantex.getTicker('BTC_USD')
    return pairs
    .filter(pair => pair.target_currency === 'USD')
    .map(pair => ({
      symbol: pair.ticker_id.replace('_USD', ''),
      price: parseFloat(pair.last_price) / parseFloat(btc.last_price)
    }))
  }
}
