import { Component } from '@angular/core';
import { DisplayContainerComponent } from '../common';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DisplayContainerComponent],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {
  public header: string = 'Debts';
  public debtsCount: number = 1;
}
