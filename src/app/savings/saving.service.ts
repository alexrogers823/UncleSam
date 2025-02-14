import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Saving } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private savingsUrl: string = 'http://localhost:8000/savings/';

  public constructor(
    private http: HttpClient
  ) { }

  public getSavings(): Observable<Saving[]> {
    return this.http.get<Saving[]>(this.savingsUrl)
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
        catchError(this.handleError<Saving[]>([]))
      )
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
