import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Debt, DebtRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private _debtsUrl: string = 'http://localhost:8000/debts/';
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  debtsMockData: Debt[] = [
    {
      id: 1,
      title: 'Discover',
      amount: 52.95,
      lastUpdated: '2025-03-01',
      dueDate: '2025-02-28'
    },
    {
      id: 2,
      title: 'Student Loans',
      amount: 8500,
      lastUpdated: '2025-01-13',
    }
  ]

  constructor(
    private _http: HttpClient
  ) { }

  getDebts(): Observable<Debt[]> {
    return this._http.get<Debt[]>(this._debtsUrl)
      .pipe(
        map((res: any[]): Debt[] => {
          return res.map((d: any): Debt => ({
            id: d.id,
            title: d.title,
            amount: d.amount,
            lastUpdated: d.updated,
            dueDate: d.due_date
          }))
        }),
        catchError(this._handleError<Debt[]>([]))
      )
  }

  getDebt(id: number): Observable<Debt> {
    return this._http.get<Debt>(`${this._debtsUrl}${id}/`)
      .pipe(
        map((res: any): Debt => ({
          id: res.id,
          title: res.title,
          amount: res.amount,
          lastUpdated: res.updated,
          dueDate: res.due_date
        })),
        catchError(this._handleError<Debt>())
      )
  }

  updateDebt(debt: Debt): Observable<Debt> {
    const mappedRequest = this._mapFieldNames(debt, 'put');

    return this._http.put<Debt>(`${this._debtsUrl}${debt.id}/`, mappedRequest, this._httpOptions);
  }

  addDebt(debtRequest: DebtRequest): Observable<Debt> {
    const mappedRequest = this._mapFieldNames(debtRequest, 'request');

    return this._http.post<Debt>(this._debtsUrl, mappedRequest, this._httpOptions);
  }

  deleteDebt(id: number): Observable<Debt> {
    return this._http.delete<Debt>(`${this._debtsUrl}${id}/`, this._httpOptions);
  }

  private _mapFieldNames(obj: any, direction: string = 'response'): any {
    if (direction === 'request') {
      return {
        title: obj.title,
        amount: obj.amount,
        due_date: obj.dueDate ? obj.dueDate.toISOString().substring(0, 10) : null
      }
    } else if (direction === 'put') {
      return {
        id: obj.id,
        title: obj.title,
        amount: obj.amount,
        updated: obj.lastUpdated,
        due_date: obj.dueDate ? obj.dueDate.toISOString().substring(0, 10) : null
      }
    }

    return {
      id: obj.id,
      title: obj.title,
      amount: obj.amount,
      lastUpdated: obj.updated,
      dueDate: obj.due_date
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private _handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
