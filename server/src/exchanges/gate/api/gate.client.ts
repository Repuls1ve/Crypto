import axios from 'axios'
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { AllTickersResponse, TickerResponse } from './interfaces/responses.interface';

export class GateClient implements ExchangeClient {
  private readonly baseURL = 'https://api.gateio.ws/api/v4'

  async getAllTickers(): Promise<AllTickersResponse> {
    return (await axios.get<AllTickersResponse>(this.baseURL + '/spot/tickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/spot/tickers?currency_pair=${symbol}`)).data
  }
}