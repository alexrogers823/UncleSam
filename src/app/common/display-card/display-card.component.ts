import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DueDatePipe } from "src/app/pipes/due-date/due-date.pipe";

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrl: './display-card.component.scss',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, DatePipe, DueDatePipe]
})
export class DisplayCardComponent {
  public title: string = 'Wells Fargo';
  public amount: number = 42.95;
  public dueDate = '2025-02-28';
  public lastUpdated = '2025-11-15';
}