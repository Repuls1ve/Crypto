import { codes } from './codes.interface';

export interface BaseResponse<T> {
  code: codes
  data: T
}

export type AllTickersResponse = BaseResponse<AllTickers>
export type TickerResponse = BaseResponse<Ticker>

export interface Ticker {
  symbol: string
  symbolName: string
  buy: string
  sell: string
  changeRate: string
  changePrice: string
  high: string
  low: string
  vol: string
  volValue: string
  last: string
  averagePrice: string
  takerFeeRate: string
  makerFeeRate: string
  takerCoefficient: string
  makerCoefficient: string
}

export interface AllTickers {
  time: number
  ticker: Ticker[]
}

export interface Ticker {
  time: number,
  ticker: Ticker
}