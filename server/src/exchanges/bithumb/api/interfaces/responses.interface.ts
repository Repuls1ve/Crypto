export type TickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker[]>

export interface BaseResponse<T> {
  code: string
  msg: string
  timestamp: number
  startTime: any
  data: T
}

export interface Ticker {
  p: string
  ver: string
  vol: string
  c: string
  s: string
  t: string
  v: string
  h: string
  l: string
}