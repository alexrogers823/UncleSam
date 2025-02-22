import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Archive, ArchiveRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private _archivesUrl = 'http://localhost:8000/archives/'
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private _http: HttpClient
  ) { }

  getArchives(): Observable<Archive[]> {
    return this._http.get<Archive[]>(this._archivesUrl)
      .pipe(
        map((res: any[]): Archive[] => {
          return res.map((a: any): Archive => ({
            type: a.type,
            amount: a.amount,
            title: a.title,
            updatedDate: a.updated_date
          }))
        }),
        catchError(this._handleError<Archive[]>([]))
      )
  }

  addToArchives(archiveRequest: ArchiveRequest): Observable<Archive> {
    return this._http.post<Archive>(this._archivesUrl, archiveRequest, this._httpOptions)
      .pipe(
        catchError(this._handleError<Archive>())
      )
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
