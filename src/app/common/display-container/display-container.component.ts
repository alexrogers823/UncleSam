import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DisplayCardComponent } from "../display-card";
import { EditCardComponent } from "../edit-card";

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrl: './display-container.component.scss',
  standalone: true,
  imports: [MatCardModule, DisplayCardComponent, EditCardComponent]
})
export class DisplayContainerComponent {
  @Input() header!: string;
  @Input() displayData!: any;
  @Input() isAddingData!: boolean;
  @Output() handleAdd = new EventEmitter<boolean>();

  add(): void {
    this.handleAdd.emit(true);
  }
}