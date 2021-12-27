import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { AllTickersResponse, TickerResponse } from './interfaces/responses.interface';

export class BybitClient implements ExchangeClient {
  private readonly baseUrl = 'https://api-testnet.bybit.com/v2'

  async getAllTickers(): Promise<AllTickersResponse> {
    return (await axios.get<AllTickersResponse>(this.baseUrl + '/public/tickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseUrl + `/public/tickers?symbol=${symbol}`)).data
  }
}