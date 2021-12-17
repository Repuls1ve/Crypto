import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class HuobiClient implements ExchangeClient {
  private readonly baseURL = 'https://api.huobi.pro'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<any>(this.baseURL + '/market/tickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<any>(this.baseURL + `/market/detail/merged?symbol=${symbol}`)).data
  }
}