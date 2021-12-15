import { ICurrency } from './currency.interface';
import { IExchange } from './exchange.interface';

export interface IPair {
  symbol: ICurrency['symbol']
  price: IExchange['price']
}

export interface IExchangePairs {
  [key: IExchange['name']]: IPair[]
}