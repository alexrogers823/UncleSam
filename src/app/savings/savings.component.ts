import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveService } from '../archives/archive.service';
import { AddCardComponent, AreaChartComponent, DeleteModalComponent, DisplayCardComponent, DisplayContainerComponent, EditCardComponent } from '../common';
import { ProgressBarComponent } from '../common/progress-bar/progress-bar.component';
import { ArchiveRequest, Saving } from '../models';
import { GoalDatePipe } from '../pipes/goal-date/goal-date.pipe';
import { EditSavingsComponent } from './edit-savings/edit-savings.component';
import { SavingService } from './saving.service';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [DisplayContainerComponent, DisplayCardComponent, AddCardComponent, EditCardComponent, DeleteModalComponent, AreaChartComponent, ProgressBarComponent, EditSavingsComponent, MatCardModule, CommonModule, CurrencyPipe, DatePipe, GoalDatePipe],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() savingsChartData: any;
  header: string = 'Savings';
  savings: Saving[] = [];
  addSavingWindowIsOpen: boolean = false;
  editSavingWindowIsOpen: boolean = false;
  savingForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _savingService: SavingService,
    private _archiveService: ArchiveService
  ) {}

  ngOnInit(): void {
    this.getSavings();

    this.savingForm = this._formBuilder.group({
      title: [null, Validators.required],
      priority: null,
      currentAmount: [null, Validators.required],
      goalAmount: null,
      goalDate: null
    })
  }

  getSavings(): void {
    this._savingService.getSavings()
      .subscribe(savings => this.savings = savings);
  }

  openDeleteModal(saving: Saving): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: saving.title }
    });

    dialogRef.afterClosed().subscribe((result: boolean): void => {
      if (result) {
        this.handleDeleteSaving(saving);
      }
    })
  }

  handleAddSavingWindow(event: boolean): void {
    // clearing form in case there was an add/edit previously 
    this.savingForm = this._formBuilder.group({
      title: [null, Validators.required],
      priority: null,
      currentAmount: [null, Validators.required],
      goalAmount: null,
      goalDate: null
    });

    this.addSavingWindowIsOpen = event;
  }

  handleEditSavingWindow(event: {shouldEdit: boolean, data: Saving | null}): void {
    const { shouldEdit, data } = event;

    if (data) {
      this.savingForm = this._formBuilder.group({
        id: data.id,
        title: [data.title, Validators.required],
        priority: data.priority,
        currentAmount: [data.currentAmount, Validators.required],
        goalAmount: data.goalAmount ? data.goalAmount : null,
        goalDate: data.goalDate ? new Date(data.goalDate) : null,
        lastUpdated: data.lastUpdated
      });
    }

    this.editSavingWindowIsOpen = shouldEdit;
  }

  handleUpdateForm(event: {field: string, value: any}): void {
    this.savingForm.value[event.field] = event.value;
  }

  handleSubmitAddSaving(event: any): void {
    console.log(event)
    // TODO: Trigger an on change strategy 
    // this._savingService.addSaving(event)
    //   .subscribe((saving: Saving): void => {
    //     this.savings.push(saving);
    //     this._addToArchives(event);
    //   })

    this._savingService.addSaving(event)
      .subscribe({
        next: (saving: Saving) => {
          this.savings.push(saving);
          this._addToArchives(event)
        }
      })
  }

  handleSubmitEditSaving(event: any): void {
    this._savingService.updateSaving(event)
      .subscribe((): void => {
        this._addToArchives(event);
      });
  }

  handleDeleteSaving(event: any): void {
    this._savingService.deleteSaving(event.id)
      .subscribe((): void => {
        this.savings = this.savings.filter(saving => saving.id !== event.id);
      })
  }

  private _addToArchives(obj: any): void {
    const archive: ArchiveRequest = { 
      type: 'Saving',
      title: obj.title,
      amount: obj.currentAmount
    }

    this._archiveService.addToArchives(archive).subscribe();
  }
}
