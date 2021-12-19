import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICurrency } from 'src/app/models/currencies.model';
import { AppState } from 'src/app/store/app.state';
import { loadCurrencies } from 'src/app/store/currencies/currencies.actions';
import { status } from 'src/app/store/currencies/currencies.reducer';
import { selectCurrencies, selectCurrenciesError, selectCurrenciesStatus } from 'src/app/store/currencies/currencies.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currencies$: Observable<ICurrency[]>
  status$: Observable<status>
  error$: Observable<string | null>

  constructor(private readonly store: Store<AppState>) {
    this.currencies$ = this.store.select(selectCurrencies)
    this.status$ = this.store.select(selectCurrenciesStatus)
    this.error$ = this.store.select(selectCurrenciesError)
  }

  ngOnInit(): void {
    this.store.dispatch(loadCurrencies())
  }
}
