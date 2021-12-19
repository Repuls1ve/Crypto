import { createAction, props } from '@ngrx/store';
import { ICurrencies } from 'src/app/models/currencies.model';

export const loadCurrencies = createAction(
  '[Currencies] Load Currencies'
)

export const loadCurrenciesSuccess = createAction(
  '[Currencies] Load Currencies Success',
  props<ICurrencies>()
)

export const loadCurrenciesFailure = createAction(
  '[Currencies] Load Currencies Failure',
  props<{ error: string }>()
)
