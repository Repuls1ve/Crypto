import { ICurrency } from './currency.interface';
import { IExchange } from './exchange.interface';

export interface IPair {
  symbol: ICurrency['name']
  price: IExchange['price']
  volume: IExchange['volume']
}

export interface IExchangePairs {
  [key: IExchange['name']]: IPair[]
}

export interface IBtcPairs {
  [key: string]: number
}