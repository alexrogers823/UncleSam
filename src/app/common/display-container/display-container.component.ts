import { CurrencyPipe } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { calculateSummary } from "src/app/utils";
import { DisplayCardComponent } from "../display-card";
import { EditCardComponent } from "../edit-card";

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrl: './display-container.component.scss',
  standalone: true,
  imports: [MatCardModule, DisplayCardComponent, EditCardComponent, CurrencyPipe]
})
export class DisplayContainerComponent implements OnChanges {
  @Input() header!: string;
  @Input() displayData!: any;
  @Input() isAddingData!: boolean;
  @Output() handleAdd = new EventEmitter<boolean>();
  summary!: number | null;
  
  ngOnChanges(): void {
    this.summary = this._displaySummary();
  }
  
  add(): void {
    this.handleAdd.emit(true);
  }
  
  displayTotalAmountMessage(): string {
    switch (this.header) {
      case 'Debts':
        return 'Total debt owed'
      case 'Savings':
        return 'Total amount currently saved'
      case 'Items':
        return 'Total amount needed to buy all items'
      default:
        return 'Total amount'
    }
  }

  private _displaySummary(): number {
    if (this.header === 'Savings') {
      return calculateSummary(this.displayData, 'currentAmount');
    }

    return calculateSummary(this.displayData, 'amount');
  }
}