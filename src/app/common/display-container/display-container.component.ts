import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DisplayCardComponent } from "../display-card";

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrl: './display-container.component.scss',
  standalone: true,
  imports: [MatCardModule, DisplayCardComponent]
})
export class DisplayContainerComponent {
  @Input() header!: string;
  @Input() count!: number;
}