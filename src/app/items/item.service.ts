import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl: string = 'http://localhost:8000/items/';

  public constructor(
    private http: HttpClient
  ) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        map((res: any[]): Item[] => {
          return res.map((d: any): Item => ({
            id: d.id,
            title: d.title,
            amount: d.amount,
            created: d.created,
            url: d.url_link,
            completed: d.completed
          }))
        }),
        catchError(this.handleError<Item[]>([]))
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
