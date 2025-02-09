import { Component } from '@angular/core';
import { DisplayCardComponent } from '../common';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DisplayCardComponent],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {

}
