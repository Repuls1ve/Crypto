export type status = 'ok' | 'error'

export interface TickerResponse extends BaseResponse {
  ch: string
  tick: TickerAlternative
}
export interface TickersResponse extends BaseResponse {
  data: Ticker[]
}

export interface BaseResponse {
  status: status
  ts: number
}

export interface Ticker {
  symbol: string
  open: number
  high: number
  low: number
  close: number
  amount: number
  vol: number
  count: number
  bid: number
  bidSize: number
  ask: number
  askSize: number
}

export interface TickerAlternative {
  id: number
  version: number
  open: Ticker['open']
  close: Ticker['close']
  low: Ticker['low']
  high: Ticker['high']
  vol: Ticker['vol']
  count: Ticker['count']
  bid: Ticker['bid'][]
  ask: Ticker['ask'][]
}