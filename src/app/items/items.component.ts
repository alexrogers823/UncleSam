import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../models';
import { CreatedDatePipe } from '../pipes/created-date/created-date.pipe';
import { EditItemsComponent } from './edit-items/edit-items.component';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [EditItemsComponent, MatCardModule, CommonModule, CurrencyPipe, CreatedDatePipe],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  public header: string = 'Items';
  public items: Item[] = [];

  public constructor(private itemService: ItemService) {}

  public ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }
}
