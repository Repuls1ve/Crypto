import { createReducer, on } from '@ngrx/store';
import { ICurrenciesDifferences } from 'src/app/models/currencies.model';
import { status } from '../currencies/currencies.reducer';
import { loadDifferences, loadDifferencesSuccess } from './differences.actions';

export interface DifferencesState {
  differences: ICurrenciesDifferences,
  error: string | null
  status: status
}

const initialState: DifferencesState = {
  differences: {} as ICurrenciesDifferences,
  error: null,
  status: 'pending'
}

export const differencesReducer = createReducer(
  initialState,
  on(loadDifferences, state => ({
    ...state,
    status: 'loading'
  })),
  on(loadDifferencesSuccess, (state, payload) => ({
    ...state,
    differences: payload,
    error: null,
    status: 'success'
  }))
)