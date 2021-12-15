import { IExchange } from './exchange.interface';

export interface ICurrency {
  symbol: string
  exchanges: IExchange[]
}