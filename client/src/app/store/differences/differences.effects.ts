import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { loadDifferences, loadDifferencesFailure, loadDifferencesSuccess } from './differences.actions';

@Injectable()
export class DifferencesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly currenciesService: CurrenciesService
  ) {}

  loadDifferences$ = createEffect(() => this.actions$.pipe(
    ofType(loadDifferences),
    switchMap(() => this.currenciesService.getDifferences().pipe(
      map(currencies => loadDifferencesSuccess(currencies)),
      catchError(error => of(loadDifferencesFailure({ error })))
    ))
  ))
}