import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class PoloniexClient implements ExchangeClient {
  private readonly baseURL = 'https://poloniex.com/public?command='

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + 'returnTicker')).data   
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await this.getAllTickers())[symbol]
  }
}