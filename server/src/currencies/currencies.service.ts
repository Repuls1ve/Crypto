import { Injectable } from '@nestjs/common';
import { CurrenciesBlacklist } from 'src/constants/currencies.blacklist';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { ICurrency } from 'src/interfaces/currency.interface';
import { IExchangePairs } from 'src/interfaces/pairs.interface';

@Injectable()
export class CurrenciesService {
  constructor(private readonly exchanges: ExchangesService) {}

  async getCurrencies(): Promise<ICurrency[]> {
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

  //Need to refactor
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
