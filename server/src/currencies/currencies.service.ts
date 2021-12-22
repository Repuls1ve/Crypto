import { Injectable } from '@nestjs/common';
import { CurrenciesBlacklist } from 'src/constants/currencies.blacklist';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { ICurrencies, ICurrenciesDifferences, ICurrency, quote } from 'src/interfaces/currency.interface';
import { IPagination, IPaginationParams } from 'src/interfaces/pagination.interface';
import { IBtcPairs, IExchangePairs } from 'src/interfaces/pairs.interface';

@Injectable()
export class CurrenciesService {
  currencies: ICurrencies
  currenciesDifferences: ICurrenciesDifferences
  btcPairs: IBtcPairs

  constructor(private readonly exchanges: ExchangesService) {
    this.startUpdatingCurrencies()
    this.startUpdatingBtcPairs() 
  }

  getCurrencies(): ICurrencies {
    return this.toQuoteCurrency('USDT')
  }

  getDifferences(): ICurrenciesDifferences {
    return this.currenciesDifferences
  }

  getDifferencesPaginated(pagination: IPaginationParams): IPagination<ICurrenciesDifferences> {
    const { size, page } = pagination
    const items = this.currenciesDifferences.currencies.slice((page - 1) * size, page * size)
    const totalItems = this.currenciesDifferences.currencies
    const totalPages = Math.ceil(totalItems.length / size)

    return {
      page: page,
      pageItems: items.length,
      pageSize: size,
      totalItems: totalItems.length,
      totalPages: totalPages,
      data: {
        ...this.currenciesDifferences,
        currencies: items
      }
    }
  }

  private startUpdatingBtcPairs(): void {
    setInterval(() => this.updateBtcPairs(), 5000)
  }

  private startUpdatingCurrencies(): void {
    setInterval(() => this.updateCurrencies(), 5000)
  }

  private async updateBtcPairs(): Promise<void> {
    this.btcPairs = await this.exchanges.huobi.getBtcPairs()
  }

  private async updateCurrencies(): Promise<void> {
    const [
      binance,
      ftx, 
      kucoin,
      bitfinex,
      hitbtc,
      huobi,
      poloniex,
      bithumb,
      bkex,
      coinex,
      garantex
    ] = await Promise.all([
      this.exchanges.binance.getPairs(),
      this.exchanges.ftx.getPairs(),
      this.exchanges.kucoin.getPairs(),
      this.exchanges.bitfinex.getPairs(),
      this.exchanges.hitbtc.getPairs(),
      this.exchanges.huobi.getPairs(),
      this.exchanges.poloniex.getPairs(),
      this.exchanges.bithumb.getPairs(),
      this.exchanges.bkex.getPairs(),
      this.exchanges.coinex.getPairs(),
      this.exchanges.garantex.getPairs()
    ])
    const pairs: IExchangePairs = {
      binance: binance,
      ftx: ftx,
      kucoin: kucoin,
      bitfinex: bitfinex,
      hitbtc: hitbtc,
      huobi: huobi,
      poloniex: poloniex,
      bithumb: bithumb,
      bkex: bkex,
      coinex: coinex,
      garantex: garantex
    }
    this.currencies = {
      timestamp: Date.now(),
      quote: 'USDT',
      currencies: this.applyPairs(pairs)
    }
    this.updateCurrenciesDifferences()
  }

  private updateCurrenciesDifferences(): void {
    const currencies = this.toQuoteCurrency('USDT')
    let currenciesDifferences = {
      ...currencies,
      currencies: currencies.currencies.map(currency => {
        const prices = currency.exchanges.map(exch => exch.price)
        const lowest = Math.min(...prices)
        const highest = Math.max(...prices)
        const percentage = ((highest / (lowest || highest)) - 1) * 100
        const price = highest - lowest

        return {
          name: currency.name,
          differences: {
            percentage: percentage,
            price: price,
            highest: highest,
            lowest: lowest
          },
          exchanges: currency.exchanges 
        }
      })
    }

    currenciesDifferences.currencies = currenciesDifferences.currencies.filter(
      c => c.differences.percentage && c.differences.percentage !== 0)

    currenciesDifferences.currencies.sort((a, b) => {
      return b.differences.percentage - a.differences.percentage
    })

    this.currenciesDifferences = currenciesDifferences
  }

  private toQuoteCurrency(quote: quote): ICurrencies {
    const quotes = this.btcPairs
    return {
      ...this.currencies,
      currencies: this.currencies.currencies.map(currency => ({
        ...currency,
        exchanges: currency.exchanges.map(exch => ({
          name: exch.name,
          price: exch.price * quotes[quote],
          volume: exch.volume
        }))
      }))
    }
  }

  private applyPairs(pairs: IExchangePairs): ICurrency[] {
    let currencies = [] as ICurrency[]
    Object.keys(pairs).forEach(exchange => {
      pairs[exchange].forEach(pair => {
        const currencyIndex = currencies.findIndex(c => c.name === pair.symbol)
        if (currencyIndex === -1) {
          !CurrenciesBlacklist.includes(pair.symbol) &&
          currencies.push({
            name: pair.symbol,
            exchanges: [{
              name: exchange,
              price: pair.price,
              volume: pair.volume
            }]
          })
        }
        else {
          const exchangeIndex = currencies[currencyIndex].exchanges.findIndex(exch => exch.name === exchange)
          if (exchangeIndex === -1) {
            currencies[currencyIndex].exchanges.push({
              name: exchange,
              price: pair.price,
              volume: pair.volume
            })
          }
        }
      })
    })
    return currencies
  }
}
