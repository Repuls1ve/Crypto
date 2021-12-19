import { createReducer, on } from '@ngrx/store'
import { ICurrencies } from 'src/app/models/currencies.model'
import { loadCurrencies, loadCurrenciesSuccess } from './currencies.actions'

export type status = 'pending' | 'loading' | 'error' | 'success'

export interface CurrenciesState {
  currencies: ICurrencies
  error: string | null
  status: status
}

const initialState: CurrenciesState = {
  currencies: {} as ICurrencies,
  error: null,
  status: 'pending'
}

export const currenciesReducer = createReducer(
  initialState,
  on(loadCurrencies, state => ({
    ...state,
    status: 'loading'
  })),
  on(loadCurrenciesSuccess, (state, payload) => ({
    ...state,
    status: 'success',
    error: null,
    currencies: payload
  }))
)