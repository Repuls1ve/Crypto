import { Injectable } from '@nestjs/common';
import { CurrenciesBlacklist } from 'src/constants/currencies.blacklist';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { ICurrency } from 'src/interfaces/currency.interface';
import { IExchangePairs } from 'src/interfaces/pairs.interface';

@Injectable()
export class CurrenciesService {
  constructor(private readonly exchanges: ExchangesService) {}

  async getCurrencies(): Promise<ICurrency[]> {
    const [binance, ftx, kucoin, bitfinex] = await Promise.all([
      this.exchanges.binance.getPairs(),
      this.exchanges.ftx.getPairs(),
      this.exchanges.kucoin.getPairs(),
      this.exchanges.bitfinex.getPairs()
    ])
    const pairs: IExchangePairs = {
      binance: binance,
      ftx: ftx,
      kucoin: kucoin,
      bitfinex: bitfinex
    }
    return this.applyPairs(pairs)
  }

  async getSignificantCurrencies() {
    let currencies = await this.getCurrencies()
    currencies.sort((a, b) => {
      const firstPrices = a.exchanges.map(exch => exch.price)
      const firstDifference = Math.max(...firstPrices) - Math.min(...firstPrices)
      const secondPrices = b.exchanges.map(exch => exch.price)
      const secondDifference = Math.max(...secondPrices) - Math.min(...secondPrices)

      return secondDifference - firstDifference
    })
    return currencies
  }

  private applyPairs(pairs: IExchangePairs): ICurrency[] {
    let currencies = [] as ICurrency[]
    Object.keys(pairs).forEach(exchange => {
      pairs[exchange].forEach(pair => {
        const currencyIndex = currencies.findIndex(c => c.symbol === pair.symbol)
        if (currencyIndex === -1) {
          !CurrenciesBlacklist.includes(pair.symbol) &&
          currencies.push({
            symbol: pair.symbol,
            exchanges: [
              {name: exchange, price: pair.price}
            ]
          })
        }
        else {
          const exchangeIndex = currencies[currencyIndex].exchanges.findIndex(exch => exch.name === exchange)
          if (exchangeIndex === -1) {
            currencies[currencyIndex].exchanges.push({name: exchange, price: pair.price})
          }
        }
      })
    })

    return currencies
  }
}
