import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';
import { BitfinexClient } from './api/bitfinex.client';

@Injectable()
export class BitfinexService implements ExchangeService {
  private readonly bitfinex = new BitfinexClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.bitfinex.getAllTickers()
    const btc = await this.bitfinex.getTicker('tBTCUSD')
    return pairs
    .filter(pair => pair[0][0] === 't' && pair[0].slice(-3) === 'USD')
    .map(pair => ({
      symbol: pair[0].replace(':', '').replace('t', '').replace('USD', ''),
      price: pair[7] / btc[0][7]
    }))
  }
}
