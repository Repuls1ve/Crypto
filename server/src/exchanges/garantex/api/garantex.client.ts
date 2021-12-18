import axios from 'axios';
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract';
import { TickerResponse, TickersResponse } from './interfaces/garantex.interface';

export class GarantexClient implements ExchangeClient {
  private readonly baseURL = 'https://garantex.io/api/v2'

  async getAllTickers(): Promise<TickersResponse> {
    return (await axios.get<TickersResponse>(this.baseURL + '/coingecko/tickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await this.getAllTickers()).filter(ticker => ticker.ticker_id === symbol)[0]
  }
}