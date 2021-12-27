export type AllTickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker[]>

export interface Ticker {
  symbol: string
  volume: string
  high: string
  low: string
  bid: string
  ask: string
  open: string
  last: string
  tiem: number
  change_rate: string
}

export interface BaseResponse<T> {
  code: string
  data: T
}