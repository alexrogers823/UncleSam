import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrl: './display-card.component.scss',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, DatePipe]
})
export class DisplayCardComponent {
  public title: string = 'Wells Fargo';
  public amount: number = 42.95;
  public dueDate = 'in 12 days';
  public lastUpdated = '2025-11-15';
}