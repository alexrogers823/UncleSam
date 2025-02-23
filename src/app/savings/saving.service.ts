import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Saving, SavingRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private _savingsUrl: string = 'http://localhost:8000/savings/';
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private _http: HttpClient
  ) { }

  getSavings(): Observable<Saving[]> {
    return this._http.get<Saving[]>(this._savingsUrl)
      .pipe(
        map((res: any[]): Saving[] => {
          return res.map((d: any): Saving => ({
            id: d.id,
            title: d.title,
            priority: d.priority,
            currentAmount: d.current_amount,
            goalAmount: d.goal,
            goalDate: d.goal_date,
            lastUpdated: d.updated
          }))
        }),
        catchError(this._handleError<Saving[]>([]))
      )
  }

  updateSaving(saving: Saving): Observable<Saving> {
    const mappedRequest = this._mapFieldNames(saving, 'put');

    return this._http.put<Saving>(`${this._savingsUrl}${saving.id}/`, mappedRequest, this._httpOptions);
  }

  addSaving(savingRequest: SavingRequest): Observable<Saving> {
    const mappedRequest = this._mapFieldNames(savingRequest, 'request');

    return this._http.post<Saving>(this._savingsUrl, mappedRequest, this._httpOptions);
  }

  deleteSaving(id: number): Observable<Saving> {
    return this._http.delete<Saving>(`${this._savingsUrl}${id}/`, this._httpOptions);
  }

  private _mapFieldNames(obj: any, direction: string = 'response'): any {
    if (direction === 'request') {
      return {
        title: obj.title,
        priority: obj.priority,
        current_amount: obj.currentAmount,
        goal: obj.goalAmount,
        goal_date: obj.goalDate ? obj.goalDate.toISOString().substring(0, 10) : null
      }
    } else if (direction === 'put') {
      return {
        id: obj.id,
        title: obj.title,
        current_amount: obj.currentAmount,
        goal: obj.goalAmount,
        goal_date: obj.goalDate ? obj.goalDate.toISOString().substring(0, 10) : null,
        updated: obj.lastUpdated
      }
    }

    return {
      id: obj.id,
      title: obj.title,
      priority: obj.priority,
      currentAmount: obj.current_amount,
      goalAmount: obj.goal,
      goalDate: obj.goal_date,
      lastUpdated: obj.updated
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
    return (error: any) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
