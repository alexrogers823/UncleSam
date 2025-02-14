import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreatedDatePipe } from '../pipes/created-date/created-date.pipe';
import { EditItemsComponent } from './edit-items/edit-items.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [EditItemsComponent, MatCardModule, CommonModule, CurrencyPipe, CreatedDatePipe],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  public header: string = 'Items';
  public itemsData = [
    {
      id: 1,
      title: 'Bowling Ball',
      created: '2025-02-03',
      amount: 199.99,
      url: 'https://www.bowlersmart.com/shop/bowling-deals/bowling-ball-deals/?/&gad_source=1&gclid=CjwKCAiAzba9BhBhEiwA7glbao93TaQNfkwul46LPj5Qj7B0ZPyyB8BLbekraDnEzrVaBvJYhpgqGBoCWv4QAvD_BwE'
    }
  ]
}
