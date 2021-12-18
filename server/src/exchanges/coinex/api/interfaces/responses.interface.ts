export interface TickerResponse extends BaseResponse {
  data: {
    date: number
    ticker: Ticker
  }
}
export interface TickersResponse extends BaseResponse {
  data: {
    date: number
    ticker: {
      [symbol: string]: Ticker
    }
  }
}

export interface BaseResponse {
  code: string
  message: string
}

export interface Ticker {
  vol: string
  low: string
  open: string
  high: string
  last: string
  buy: string
  buy_amount: string
  sell: string
  sell_amount: string
}