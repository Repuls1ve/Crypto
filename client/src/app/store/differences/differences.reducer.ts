import { createReducer, on } from '@ngrx/store';
import { ICurrenciesDifferences } from 'src/app/models/currencies.model';
import { IPagination } from 'src/app/models/pagination.model';
import { status } from '../currencies/currencies.reducer';
import { loadDifferences, loadDifferencesSuccess } from './differences.actions';

export interface DifferencesState {
  result: IPagination<ICurrenciesDifferences> | null,
  error: string | null
  status: status
}

const initialState: DifferencesState = {
  result: null,
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
    result: payload,
    error: null,
    status: 'success'
  }))
)