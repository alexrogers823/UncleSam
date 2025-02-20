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
import { DebtService } from '../debt.service';

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
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() updateForm = new EventEmitter();
  
  public constructor(
    private formBuilder: FormBuilder,
    private debtService: DebtService
  ) { }

  public ngOnInit(): void {
    this.formBuilder.group(this.debtForm);
  }

  public close(): void {
    this.closeForm.emit(false);
  }

  public update(field: string): void {
    this.updateForm.emit({field, value: this.debtForm.value[field]});
  }
}
