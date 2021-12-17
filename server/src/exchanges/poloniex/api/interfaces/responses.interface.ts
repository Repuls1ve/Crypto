export type TickerResponse = Ticker
export interface TickersResponse {
  [symbol: string]: Ticker
}

export interface Ticker {
  id: number
  last: string
  lowestAsk: string
  highestBid: string
  percentChange: string
  baseVolume: string
  quoteVolume: string
  isFrozen: string
  postOnly: string
  marginTradingEnabled: string
  high24hr: string
  low24hr: string
}