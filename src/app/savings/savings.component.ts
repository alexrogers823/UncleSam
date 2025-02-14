import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Saving } from '../models';
import { GoalDatePipe } from '../pipes/goal-date/goal-date.pipe';
import { EditSavingsComponent } from './edit-savings/edit-savings.component';
import { SavingService } from './saving.service';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [EditSavingsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, GoalDatePipe],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent implements OnInit {
  public header: string = 'Savings';
  public savings: Saving[] = [];

  public constructor(private savingService: SavingService) {}

  public ngOnInit(): void {
    this.getService();
  }

  public getService(): void {
    this.savingService.getSavings()
      .subscribe(savings => this.savings = savings);
  }
}
