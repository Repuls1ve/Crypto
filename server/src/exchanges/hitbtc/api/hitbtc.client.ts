import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class HitbtcClient implements ExchangeClient {
  private readonly baseURL = 'https://api.hitbtc.com/api/3'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + '/public/ticker')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/public/ticker/${symbol}`)).data
  }
}