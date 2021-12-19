export interface IExchange {
  name: string
  price: number
}

export interface ICurrency {
  name: string
  quote: ICurrency['name']
  exchanges: IExchange
}

export interface ICurrencies {
  timestamp: number
  currencies: ICurrency[]
}