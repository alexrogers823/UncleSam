import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Debt, DebtRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private debtsUrl: string = 'http://localhost:8000/debts/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  public debtsMockData: Debt[] = [
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

  public constructor(
    private http: HttpClient
  ) { }

  public getDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(this.debtsUrl)
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
        catchError(this.handleError<Debt[]>([]))
      )
  }

  public getDebt(id: number): Observable<Debt> {
    return this.http.get<Debt>(`${this.debtsUrl}/${id}/`)
      .pipe(
        map((res: any): Debt => ({
          id: res.id,
          title: res.title,
          amount: res.amount,
          lastUpdated: res.updated,
          dueDate: res.due_date
        })),
        catchError(this.handleError<Debt>())
      )
  }

  public updateDebt(debt: Debt): Observable<any> {
    return this.http.put(this.debtsUrl, debt, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>())
      )
  }

  public addDebt(debtRequest: DebtRequest): Observable<Debt> {
    const mappedRequest = this.mapFieldNames(debtRequest, 'request');

    return this.http.post<Debt>(this.debtsUrl, mappedRequest, this.httpOptions)
      .pipe(
        catchError(this.handleError<Debt>())
      )
  }

  public deleteDebt(id: number): Observable<Debt> {
    return this.http.delete<Debt>(this.debtsUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Debt>())
      )
  }

  private mapFieldNames(obj: any, direction: string = 'response'): any {
    if (direction === 'request') {
      return {
        title: obj.title,
        amount: obj.amount,
        due_date: obj.dueDate.toISOString().substring(0, 10)
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
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
