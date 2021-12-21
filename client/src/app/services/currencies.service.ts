import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICurrencies, ICurrenciesDifferences } from '../models/currencies.model';
import { IPagination, IPaginationParams } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  constructor(private readonly http: HttpClient) {}

  getCurrencies(): Observable<ICurrencies> {
    return this.http.get<ICurrencies>(environment.baseURL + '/currencies')
  }

  getDifferencesPaginated(pagination: IPaginationParams): Observable<IPagination<ICurrenciesDifferences>> {
    const {size, page} = pagination
    return this.http.get<IPagination<ICurrenciesDifferences>>(environment.baseURL+ `/currencies/differences/pagination?size=${size}&page=${page}`)
  }
}
