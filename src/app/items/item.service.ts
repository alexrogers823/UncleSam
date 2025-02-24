import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Item, ItemRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _itemsUrl: string = 'http://localhost:8000/items/';
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private _http: HttpClient
  ) { }

  getItems(): Observable<Item[]> {
    return this._http.get<Item[]>(this._itemsUrl)
      .pipe(
        map((res: any[]): Item[] => {
          return res.map((d: any): Item => ({
            id: d.id,
            title: d.title,
            amount: d.amount,
            createdDate: d.created,
            url: d.url_link,
            completed: d.completed
          }))
        }),
        catchError(this._handleError<Item[]>([]))
      )
  }

  updateItem(item: Item): Observable<Item> {
    const mappedRequest = this._mapFieldNames(item, 'put');

    return this._http.put<Item>(`${this._itemsUrl}${item.id}/`, mappedRequest, this._httpOptions);
  }

  addItem(itemRequest: ItemRequest): Observable<Item> {
    const mappedRequest = this._mapFieldNames(itemRequest, 'request');

    return this._http.post<Item>(this._itemsUrl, mappedRequest, this._httpOptions);
  }

  deleteItem(id: number): Observable<Item> {
    return this._http.delete<Item>(`${this._itemsUrl}${id}/`, this._httpOptions);
  }

  private _mapFieldNames(obj: any, direction: string = 'response'): any {
    if (direction === 'request') {
      return {
        title: obj.title,
        amount: obj.amount,
        url_link: obj.url,
        completed: obj.completed
      }
    } else if (direction === 'put') {
      return {
        id: obj.id,
        title: obj.title,
        amount: obj.amount,
        url_link: obj.url,
        completed: obj.completed,
        created: obj.createdDate
      }
    }

    return {
      id: obj.id,
      title: obj.title,
      amount: obj.amount,
      url: obj.url_link,
      completed: obj.completed,
      createdDate: obj.created
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
