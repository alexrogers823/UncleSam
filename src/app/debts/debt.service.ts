import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Debt } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
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

  constructor() { }

  getDebts(): Observable<Debt[]> {
    return of(this.debtsMockData);
  }
}
