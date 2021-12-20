import { createAction, props } from '@ngrx/store'
import { ICurrenciesDifferences, ICurrenciesError } from 'src/app/models/currencies.model'

export const loadDifferences = createAction(
  '[Currencies] Load Differences'
)

export const loadDifferencesSuccess = createAction(
  '[Currencies] Load Differences Success',
  props<ICurrenciesDifferences>()
)

export const loadDifferencesFailure = createAction(
  '[Currencies> Load Differences Failure',
  props<ICurrenciesError>()
)