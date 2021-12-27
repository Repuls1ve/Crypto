import axios from 'axios'
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { AllTickersResponse, TickerResponse } from './interfaces/responses.interface';

export class MexcClient implements ExchangeClient {
  private readonly baseURL = 'https://www.mexc.com/open/api/v2'

  async getAllTickers(): Promise<AllTickersResponse> {
    return (await axios.get<AllTickersResponse>(this.baseURL + '/market/ticker')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/market/ticker?symbol=${symbol}`)).data
  }
}