import { createAction, props } from '@ngrx/store'
import { ICurrenciesDifferences, ICurrenciesError } from 'src/app/models/currencies.model'
import { IPagination, IPaginationParams } from 'src/app/models/pagination.model'

export const loadDifferences = createAction(
  '[Currencies] Load Differences',
  props<IPaginationParams>()
)

export const loadDifferencesSuccess = createAction(
  '[Currencies] Load Differences Success',
  props<IPagination<ICurrenciesDifferences>>()
)

export const loadDifferencesFailure = createAction(
  '[Currencies> Load Differences Failure',
  props<ICurrenciesError>()
)