import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class BithumbClient implements ExchangeClient {
  private readonly baseURL = 'https://global-openapi.bithumb.pro/openapi/v1'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + '/spot/ticker?symbol=ALL')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/spot/ticker?symbol=${symbol}`)).data
  }
}