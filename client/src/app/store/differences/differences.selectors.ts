import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DifferencesState } from './differences.reducer';


const differencesFeature = (state: AppState) => state.differences

export const selectDifferencesStatus = createSelector(
  differencesFeature,
  (state: DifferencesState) => state.status
)

export const selectDifferencesData = createSelector(
  differencesFeature,
  (state: DifferencesState) => state.result
)

export const selectDifferencesError = createSelector(
  differencesFeature,
  (state: DifferencesState) => state.error
)