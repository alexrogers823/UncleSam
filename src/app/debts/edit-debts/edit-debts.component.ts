import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-debts',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatDatepickerModule, MatExpansionModule],
  templateUrl: './edit-debts.component.html',
  styleUrl: './edit-debts.component.scss'
})
export class EditDebtsComponent implements OnInit {
  public debtForm!: FormGroup;
  
  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.debtForm = this.formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      dueDate: null
    })
  }

  public submit() {
    console.log(this.debtForm.value);
  }
}
