import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-card',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss'
})
export class AddCardComponent implements OnInit {
  @Input() formData!: FormGroup;
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<any>();

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.formBuilder.group(this.formData)
  }

  public close(): void {
    this.closeForm.emit(false);
  }

  public submit(): void {
    this.submitForm.emit(this.formData.value);
    this.close();
  }
}
