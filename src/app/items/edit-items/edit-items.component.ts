import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-items',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './edit-items.component.html',
  styleUrl: './edit-items.component.scss'
})
export class EditItemsComponent {

}
