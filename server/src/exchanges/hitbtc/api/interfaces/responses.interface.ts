export type TickerResponse = Ticker
export type TickersResponse = {
  [symbol: string]: Ticker
}

export interface Ticker {
  ask: string
  bid: string
  last: string
  low: string
  high: string
  open: string
  volume: string
  volume_quote: string
  timestamp: string
}