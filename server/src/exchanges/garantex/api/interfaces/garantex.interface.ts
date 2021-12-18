export type TickerResponse = Ticker
export type TickersResponse = Ticker[]

export interface Ticker {
  ticker_id: string
  base_currency: string
  target_currency: string
  last_price: string
  base_volume: string
  target_volume: string
  bid: string
  ask: string
  high: string
  low: string
}