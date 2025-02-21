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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formBuilder.group(this.formData)
  }

  close(): void {
    this.closeForm.emit(false);
  }

  submit(): void {
    this.submitForm.emit(this.formData.value);
    this.close();
  }
}
