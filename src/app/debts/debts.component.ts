import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddCardComponent, DisplayContainerComponent } from '../common';
import { Debt } from '../models';
import { DueDatePipe } from '../pipes';
import { DebtService } from './debt.service';
import { EditDebtsComponent } from './edit-debts/edit-debts.component';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DisplayContainerComponent, AddCardComponent, EditDebtsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit {
  public header: string = 'Debts';
  public debts: Debt[] = [];
  public addDebtWindowIsOpen: boolean = false;
  public debtForm!: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private debtService: DebtService
  ) { }

  public ngOnInit(): void {
    this.getDebts();

    this.debtForm = this.formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    })
  }

  public getDebts(): void {
    this.debtService.getDebts()
      .subscribe(debts => this.debts = debts);
  }

  public handleAddDebtWindow(event: boolean): void {
    this.addDebtWindowIsOpen = event;
  }

  public handleUpdateForm(event: {field: string, value: any}): void {
    this.debtForm.value[event.field] = event.value;
  }

  public handleSubmitDebt(event: any): void {
    // TODO: Trigger an on change strategy 
    this.debtService.addDebt(event)
      .subscribe(debt => {
        this.debts.push(debt);
      })
  }
}
