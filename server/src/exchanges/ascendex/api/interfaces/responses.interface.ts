export type AllTickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker>

export interface Ticker {
  symbol: string
  open: string
  close: string
  high: string
  low: string
  volume: string
  ask: string[]
  bid: string[]
}

export interface BaseResponse<T> {
  code: number
  data: T
}