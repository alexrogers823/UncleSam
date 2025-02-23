import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Saving } from 'src/app/models';

@Component({
  selector: 'app-edit-savings',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatDatepickerModule, MatExpansionModule],
  templateUrl: './edit-savings.component.html',
  styleUrl: './edit-savings.component.scss'
})
export class EditSavingsComponent implements OnInit {
  @Input() savings!: Saving[];
  @Input() savingForm!: FormGroup;
  @Input() isEditMode!: boolean;
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() updateForm = new EventEmitter();
  currentDate: Date = new Date();

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._formBuilder.group(this.savingForm);
  }

  close(): void {
    this.closeForm.emit(false);
  }

  update(field: string): void {
    this.updateForm.emit({ field, value: this.savingForm.value[field] })
  }
}
