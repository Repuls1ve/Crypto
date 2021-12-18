import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/responses.interface';

export class CoinexClient implements ExchangeClient {
  private readonly baseURL = 'https://api.coinex.com/v1'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + '/market/ticker/all')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/market/ticker?market=${symbol}`)).data
  }
}