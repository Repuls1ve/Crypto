import axios from 'axios'
import { ExchangeClient } from 'src/abstractions/exchange-client.abstract'

export class BitfinexClient implements ExchangeClient {
  private readonly baseURL = 'https://api-pub.bitfinex.com/v2'

  async getAllTickers(): Promise<any> {
    return (await axios.get<any>(this.baseURL + '/tickers?symbols=ALL')).data
  }

  async getTicker(symbol: string): Promise<any> {
    return (await axios.get<any>(this.baseURL + `/tickers?symbols=${symbol}`)).data
  }
}