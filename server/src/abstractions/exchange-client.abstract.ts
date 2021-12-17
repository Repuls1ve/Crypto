export abstract class ExchangeClient {
  abstract getAllTickers(): Promise<any>

  abstract getTicker(symbol: string): Promise<any>
}