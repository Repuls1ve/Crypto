export type TickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker[]>

export interface BaseResponse<T> {
  msg: string
  code: string
  data: T
}

export interface Ticker {
  symbol: string
  close: number
  open: number
  high: number
  low: number
  volume: number
  quoteVolume: number
  change: number
  ts: number
}