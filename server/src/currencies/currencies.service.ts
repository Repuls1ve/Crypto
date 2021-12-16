import { Injectable } from '@nestjs/common';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { ICurrency } from 'src/interfaces/currency.interface';
import { IExchangePairs } from 'src/interfaces/pairs.interface';

@Injectable()
export class CurrenciesService {
  constructor(private readonly exchanges: ExchangesService) {}

  async getCurrencies(): Promise<ICurrency[]> {
    const pairs: IExchangePairs = {
      binance: await this.exchanges.binance.getPairs(),
      ftx: await this.exchanges.ftx.getPairs()
    }
    return this.applyPairs(pairs)
  }

  private applyPairs(pairs: IExchangePairs): ICurrency[] {
    let currencies = [] as ICurrency[]
    Object.keys(pairs).forEach(exchange => {
      pairs[exchange].forEach(pair => {
        const currencyIndex = currencies.findIndex(c => c.symbol === pair.symbol)
        if (currencyIndex === -1) {
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
