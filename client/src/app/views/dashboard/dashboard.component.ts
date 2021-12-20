import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadDifferences } from 'src/app/store/differences/differences.actions';
import { selectDifferencesData, selectDifferencesError, selectDifferencesStatus } from 'src/app/store/differences/differences.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dateInvervalId!: ReturnType<typeof setInterval>
  currenciesIntervalId!: ReturnType<typeof setInterval>

  data$ = this.store.select(selectDifferencesData)
  status$ = this.store.select(selectDifferencesStatus)
  error$ = this.store.select(selectDifferencesError)

  currentDate = Date.now()

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadDifferences())
    this.dateInvervalId = setInterval(() => 
      this.currentDate = Date.now(), 1000)
    this.currenciesIntervalId = setInterval(() =>
      this.store.dispatch(loadDifferences()), 10000)
  }

  ngOnDestroy(): void {
    clearInterval(this.dateInvervalId)
    clearInterval(this.currenciesIntervalId)
  }

  getLastUpdateDate() {
    let lastUpdateDate = this.currentDate
    this.data$.subscribe(data =>
      lastUpdateDate = this.currentDate - data.timestamp).unsubscribe()
    return lastUpdateDate
  }
}
