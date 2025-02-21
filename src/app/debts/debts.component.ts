import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddCardComponent, DisplayContainerComponent, EditCardComponent } from '../common';
import { Debt } from '../models';
import { DueDatePipe } from '../pipes';
import { DebtService } from './debt.service';
import { EditDebtsComponent } from './edit-debts/edit-debts.component';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DisplayContainerComponent, AddCardComponent, EditCardComponent, EditDebtsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit {
  header: string = 'Debts';
  debts: Debt[] = [];
  addDebtWindowIsOpen: boolean = false;
  editDebtWindowIsOpen: boolean = false;
  debtForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private debtService: DebtService
  ) { }

  ngOnInit(): void {
    this.getDebts();

    this.debtForm = this.formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    })
  }

  getDebts(): void {
    this.debtService.getDebts()
      .subscribe(debts => this.debts = debts);
  }

  handleAddDebtWindow(event: boolean): void {
    this.debtForm = this.formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    });

    this.addDebtWindowIsOpen = event;
  }

  handleEditDebtWindow(event: boolean, debt: Debt | null = null): void {
    if (debt) {
      this.debtForm = this.formBuilder.group({
        id: debt.id,
        title: [debt.title, Validators.required],
        amount: [debt.amount, Validators.required],
        lastUpdated: debt.lastUpdated,
        dueDate: debt.dueDate ? new Date(debt.dueDate) : null
      });
    }

    this.editDebtWindowIsOpen = event;
  }

  handleUpdateForm(event: {field: string, value: any}): void {
    this.debtForm.value[event.field] = event.value;
  }

  handleSubmitAddDebt(event: any): void {
    // TODO: Trigger an on change strategy 
    this.debtService.addDebt(event)
      .subscribe(debt => {
        this.debts.push(debt);
      })
  }

  handleSubmitEditDebt(event: any): void {
    // TODO: Same as above 
    this.debtService.updateDebt(event)
      .subscribe();
  }
}
