import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICurrencies, ICurrenciesDifferences } from '../models/currencies.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  constructor(private readonly http: HttpClient) {}

  getCurrencies(): Observable<ICurrencies> {
    return this.http.get<ICurrencies>(environment.baseURL + '/currencies')
  }

  getDifferences(): Observable<ICurrenciesDifferences> {
    return this.http.get<ICurrenciesDifferences>(environment.baseURL + '/currencies/differences')
  }
}
