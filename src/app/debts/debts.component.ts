import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveService } from '../archives/archive.service';
import { AddCardComponent, DeleteModalComponent, DisplayContainerComponent, EditCardComponent } from '../common';
import { ArchiveRequest, Debt } from '../models';
import { DueDatePipe } from '../pipes';
import { DebtService } from './debt.service';
import { EditDebtsComponent } from './edit-debts/edit-debts.component';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DisplayContainerComponent, AddCardComponent, EditCardComponent, DeleteModalComponent, EditDebtsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() debtsChartData: any;
  header: string = 'Debts';
  debts: Debt[] = [];
  addDebtWindowIsOpen: boolean = false;
  editDebtWindowIsOpen: boolean = false;
  debtForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _debtService: DebtService,
    private _archiveService: ArchiveService
  ) { }

  ngOnInit(): void {
    this.getDebts();

    this.debtForm = this._formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    })
  }

  getDebts(): void {
    this._debtService.getDebts()
      .subscribe((debts: Debt[]) => this.debts = debts);
  }

  openDeleteModal(debt: Debt): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: debt.title }
    });

    dialogRef.afterClosed().subscribe((result: boolean): void => {
      if (result) {
        this.handleDeleteDebt(debt);
      }
    })
  }

  handleAddDebtWindow(event: boolean): void {
    // clearing form in case there was an add/edit previously 
    this.debtForm = this._formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    });

    this.addDebtWindowIsOpen = event;
  }

  handleEditDebtWindow(event: boolean, debt: Debt | null = null): void {
    if (debt) {
      this.debtForm = this._formBuilder.group({
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
    this._debtService.addDebt(event)
      .subscribe((debt: Debt): void => {
        this.debts.push(debt);
      })

    this._addToArchives(event);

  }

  handleSubmitEditDebt(event: any): void {
    // TODO: Same as above 
    this._debtService.updateDebt(event)
      .subscribe();

    this._addToArchives(event);
  }

  handleDeleteDebt(event: any): void {
    // TODO: Same as above 
    this._debtService.deleteDebt(event.id)
      .subscribe(() => {
        this.debts = this.debts.filter(debt => debt.id !== event.id);
      })
  }

  private _addToArchives(obj: any): void {
    const archive: ArchiveRequest = { 
      type: 'Debt',
      title: obj.title,
      amount: obj.amount
    }

    this._archiveService.addToArchives(archive).subscribe();
  }
}
