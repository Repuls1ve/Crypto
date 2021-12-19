import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { loadCurrencies, loadCurrenciesFailure, loadCurrenciesSuccess } from './currencies.actions';

@Injectable()
export class CurrenciesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly currenciesService: CurrenciesService
  ) {}

  loadCurrencies$ = createEffect(() => this.actions$.pipe(
    ofType(loadCurrencies),
    switchMap(() => this.currenciesService.getCurrencies().pipe(
      map(currencies => loadCurrenciesSuccess(currencies)),
      catchError(error => of(loadCurrenciesFailure({ error })))
    ))
  ))
}