import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AddCardComponent } from 'src/app/common';
import { Debt } from 'src/app/models';

@Component({
  selector: 'app-edit-debts',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [AddCardComponent, FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatDatepickerModule, MatExpansionModule],
  templateUrl: './edit-debts.component.html',
  styleUrl: './edit-debts.component.scss'
})
export class EditDebtsComponent implements OnInit {
  @Input() debts!: Debt[];
  @Input() debtForm!: FormGroup;
  @Input() isEditMode!: boolean;
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() updateForm = new EventEmitter();
  currentDate: Date = new Date();
  
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._formBuilder.group(this.debtForm);
  }

  close(): void {
    this.closeForm.emit(false);
  }

  update(field: string): void {
    this.updateForm.emit({ field, value: this.debtForm.value[field] });
  }
}
