import { CurrenciesState } from './currencies/currencies.reducer';
import { DifferencesState } from './differences/differences.reducer';

export interface AppState {
  currencies: CurrenciesState,
  differences: DifferencesState
}