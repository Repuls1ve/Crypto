export type AllTickersResponse = Ticker[]
export type TickerResponse = Ticker[]

export interface Ticker {
  currency_pair: string
  last: string
  lowest_ask: string
  highest_bid: string
  change_percentage: string
  base_volume: string
  quote_volume: string
  high_24h: string
  low_24h: string
}