import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EditCardComponent } from '../common/edit-card';
import { DueDatePipe } from '../pipes';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [EditCardComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {
  public header: string = 'Debts';
  public debtsData = [
    {
      id: 1,
      title: 'Discover',
      amount: 42.95,
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
}
