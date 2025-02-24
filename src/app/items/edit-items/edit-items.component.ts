import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddCardComponent } from 'src/app/common';
import { Item } from 'src/app/models';

@Component({
  selector: 'app-edit-items',
  standalone: true,
  imports: [AddCardComponent, FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './edit-items.component.html',
  styleUrl: './edit-items.component.scss'
})
export class EditItemsComponent implements OnInit {
  @Input() items!: Item[];
  @Input() itemForm!: FormGroup;
  @Input() isEditMode!: boolean;
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() updateForm = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._formBuilder.group(this.itemForm);
  }

  close(): void {
    this.closeForm.emit(false);
  }

  update(field: string): void {
    this.updateForm.emit({ field, value: this.itemForm.value[field] })
  }
}
