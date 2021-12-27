export type AllTickersResponse = BaseResponse<Ticker[]>
export type TickerResponse = BaseResponse<Ticker[]>

export interface Ticker {
  symbol: string
  bid_price: string
  ask_price: string
  last_price: string
  last_tick_direction: string
  prev_price_24h: string
  price_24h_pcnt: string
  high_price_24h: string
  low_price_24h: string
  prev_price_1h: string
  price_1h_pcnt: string
  mark_price: string
  index_price: string
  open_interest: number
  open_value: string
  total_turnover: string
  turnover_24h: string
  total_volume: number
  volume_24h: number
  funding_rate: string
  predicted_funding_rate: string
  next_funding_rate: string
  countdown_hour: number
  delivery_fee_rate: string
  predicted_delivery_price: string
  delivery_time: string
}

export interface BaseResponse<T> {
  ret_code: number
  ret_msg: string
  ext_code: string
  ext_info: string
  result: T
  time_now: string
}