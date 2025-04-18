import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DueDatePipe } from "src/app/pipes/due-date/due-date.pipe";

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrl: './display-card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, CurrencyPipe, DatePipe, DueDatePipe]
})
export class DisplayCardComponent {
  @Input() entity!: any;
  @Input() cardDisabled!: boolean;
  @Output() openEditCard = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  editCard(): void {
    this.openEditCard.emit({shouldEdit: true, data: this.entity});
  }

  deleteCard(): void {
    this.openDeleteModal.emit(this.entity);
  }
}