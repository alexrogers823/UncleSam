import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class EditCardComponent {
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