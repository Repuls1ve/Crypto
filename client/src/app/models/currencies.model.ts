export type quote = 'USDT'

export interface ICurrenciesError {
  error: string
}

export interface IExchange {
  name: string
  price: number
}

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