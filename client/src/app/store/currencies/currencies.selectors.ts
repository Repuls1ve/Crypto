import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CurrenciesState } from './currencies.reducer';

const currenciesFeature = (state: AppState) => state.currencies

export const selectCurrenciesStatus = createSelector(
  currenciesFeature,
  (state: CurrenciesState) => state.status
)

export const selectCurrencies = createSelector(
  currenciesFeature,
  (state: CurrenciesState) => state.currencies.currencies
)

export const selectCurrenciesError = createSelector(
  currenciesFeature,
  (state: CurrenciesState) => state.error
)
