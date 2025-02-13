import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GoalDatePipe } from '../pipes/goal-date/goal-date.pipe';
import { EditSavingsComponent } from './edit-savings/edit-savings.component';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [EditSavingsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, GoalDatePipe],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent {
  public header: string = 'Savings';
  public savingsData = [
    {
      id: 1,
      title: 'Berlin',
      priority: 1,
      currentAmount: 3250,
      goalAmount: 5000,
      goalDate: '2025-05-15',
      lastUpdated: '2025-01-04'
    }
  ]
}
