import axios from 'axios'
import { AllTickersResponse, TickerResponse } from './interfaces/responses.interface'

export class KucoinClient {
  private readonly baseURL = 'http://openapi-v2.kucoin.com/api/v1'

  async getAllTickers(): Promise<AllTickersResponse> {
    return (await axios.get<AllTickersResponse>(this.baseURL + '/market/allTickers')).data
  }

  async getTicker(symbol: string): Promise<TickerResponse> {
    return (await axios.get<TickerResponse>(this.baseURL + `/market/stats?symbol=${symbol}`)).data
  }
}