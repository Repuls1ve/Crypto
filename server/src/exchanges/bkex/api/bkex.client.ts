import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class BkexClient implements ExchangeClient {
  private readonly baseURL = 'https://api.bkex.com/v2'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + '/q/tickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/q/tickers?symbol=${symbol}`)).data
  }
}