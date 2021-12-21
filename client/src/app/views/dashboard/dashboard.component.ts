import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { ICurrencyDifferences } from 'src/app/models/currencies.model';
import { IPaginationParams } from 'src/app/models/pagination.model';
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
  currenciesUpdateTime = 10000

  result$ = this.store.select(selectDifferencesData)
  status$ = this.store.select(selectDifferencesStatus)
  error$ = this.store.select(selectDifferencesError)

  currentDate = Date.now()
  currentPageSize = 10
  currentPage = 1

  modalData: ICurrencyDifferences = {} as ICurrencyDifferences
  modalHidden = true

  constructor(
    private readonly store: Store<AppState>,
    public media: MediaObserver
  ) {}

  ngOnInit(): void {
    const paginationParams: IPaginationParams = {size: this.currentPageSize, page: this.currentPage}
    this.store.dispatch(loadDifferences(paginationParams))
    this.dateInvervalId = setInterval(() => 
      this.currentDate = Date.now(), 1000)
    this.currenciesIntervalId = setInterval(() =>
      this.store.dispatch(loadDifferences(paginationParams)), this.currenciesUpdateTime)
  }

  ngOnDestroy(): void {
    clearInterval(this.dateInvervalId)
    clearInterval(this.currenciesIntervalId)
  }

  getLastUpdateDate() {
    let lastUpdateDate = this.currentDate
    this.result$.subscribe(result =>
      lastUpdateDate = this.currentDate - (result?.data.timestamp || this.currentDate)).unsubscribe()
    return lastUpdateDate
  }

  openModal(currency: ICurrencyDifferences): void {
    let exchanges = [...currency.exchanges]
    exchanges.sort((a, b) => b.price - a.price)
    currency = {...currency, exchanges}
    this.modalData = currency
    this.modalHidden = false
  }

  closeModal(): void {
    this.modalHidden = true
  }

  changePage(page: number): void {
    this.currentPage = page
    const paginationParams: IPaginationParams = {size: this.currentPageSize, page: this.currentPage}
    this.store.dispatch(loadDifferences({size: this.currentPageSize, page: this.currentPage}))
    clearInterval(this.currenciesIntervalId)
    this.currenciesIntervalId = setInterval(() =>
      this.store.dispatch(loadDifferences(paginationParams)), this.currenciesUpdateTime)
  }
}
