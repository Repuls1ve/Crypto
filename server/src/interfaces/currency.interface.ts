import { IExchange } from './exchange.interface';

export type quote = 'USDT'

export interface ICurrency {
  name: string
  exchanges: IExchange[]
}

export interface ICurrencies {
  quote: quote
  timestamp: number
  currencies: ICurrency[]
}

export interface ICurrencyDifferences extends ICurrency {
  differences: IDifference
}

export interface ICurrenciesDifferences {
  quote: ICurrencies['quote'],
  timestamp: ICurrencies['timestamp']
  currencies: ICurrencyDifferences[]
}

export interface IDifference {
  percentage: number
  price: number
  lowest: number
  highest: number
}