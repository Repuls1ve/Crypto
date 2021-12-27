import axios from 'axios'
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { AllTickersResponse, TickerResponse } from './interfaces/responses.interface';

export class HooClient implements ExchangeClient {
  private readonly baseURL = 'https://api.hoolgd.com/open/v1'

  async getAllTickers(): Promise<AllTickersResponse> {
    return (await axios.get<AllTickersResponse>(this.baseURL + '/tickers/market')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/tickers/market?symbol=${symbol}`)).data
  }
}