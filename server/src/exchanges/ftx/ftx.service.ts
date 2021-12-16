import { Injectable } from '@nestjs/common';
import { RestClient } from 'ftx-api';
import { ExchangeService } from 'src/abstractions/exchange-service.abstract';
import { IPair } from 'src/interfaces/pairs.interface';

@Injectable()
export class FtxService implements ExchangeService {
  private readonly ftx = new RestClient()

  async getPairs(): Promise<IPair[]> {
    const pairs = await this.ftx.getMarkets()
    const btc = (await this.ftx.getMarket('BTC/USD')).result
    return pairs.result
    .filter(pair => pair.type === 'spot' && pair.quoteCurrency === 'USD')
    .map(pair => ({symbol: pair.baseCurrency, price: pair.price / btc.price}))
  }

}
