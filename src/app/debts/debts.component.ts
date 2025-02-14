import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Debt } from '../models';
import { DueDatePipe } from '../pipes';
import { DebtService } from './debt.service';
import { EditDebtsComponent } from './edit-debts/edit-debts.component';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [EditDebtsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit {
  public header: string = 'Debts';
  public debts: Debt[] = [];

  public constructor(private debtService: DebtService) {}

  public ngOnInit(): void {
    this.getDebts();
  }

  public getDebts(): void {
    this.debtService.getDebts()
      .subscribe(debts => this.debts = debts);
  }
}
