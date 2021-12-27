export type AllTickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker[]>

export interface BaseResponse<T> {
  code: number
  code_num?: number
  msg?: string
  message?: string
  data: T
}

export interface Ticker {
  amount: string
  amt_num: number
  change: string
  high: string
  low: string
  price: string
  qty_num: number
  symbol: string
  volume: string
}