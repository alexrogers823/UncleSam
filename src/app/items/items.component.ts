import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveService } from '../archives/archive.service';
import { AddCardComponent, BarChartComponent, DeleteModalComponent, DisplayCardComponent, DisplayContainerComponent, EditCardComponent } from '../common';
import { ArchiveRequest, Item } from '../models';
import { CreatedDatePipe } from '../pipes/created-date/created-date.pipe';
import { EditItemsComponent } from './edit-items/edit-items.component';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [DisplayContainerComponent, DisplayCardComponent, AddCardComponent, EditCardComponent, DeleteModalComponent, BarChartComponent, EditItemsComponent, MatCardModule, CommonModule, CurrencyPipe, CreatedDatePipe],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() itemsChartData: any;
  header: string = 'Items';
  items: Item[] = [];
  addItemWindowIsOpen: boolean = false;
  editItemWindowIsOpen: boolean = false;
  itemForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _itemService: ItemService,
    private _archiveService: ArchiveService
  ) { }

  ngOnInit(): void {
    this.getItems();

    this.itemForm = this._formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      url: null,
      completed: [false, Validators.required]
    });
  }

  getItems(): void {
    this._itemService.getItems()
      .subscribe(items => this.items = items);
  }

  openDeleteModal(item: Item): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: item.title }
    });

    dialogRef.afterClosed().subscribe((result: boolean): void => {
      if (result) {
        this.handleDeleteItem(item);
      }
    })
  }

  handleAddItemWindow(event: boolean): void {
    // clearing form in case there was an add/edit previously 
    this.itemForm = this._formBuilder.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      url: null,
      completed: [false, Validators.required]
    });

    this.addItemWindowIsOpen = event;
  }

  handleEditItemWindow(event: {shouldEdit: boolean, data: Item | null}): void {
    const { shouldEdit, data } = event;

    if (data) {
      this.itemForm = this._formBuilder.group({
        id: data.id,
        title: data.title,
        amount: data.amount,
        url: data.url ? data.url : null,
        createdDate: data.createdDate
      });
    }

    this.editItemWindowIsOpen = shouldEdit;
  }

  handleUpdateForm(event: {field: string, value: any}): void {
    this.itemForm.value[event.field] = event.value;
  }

  handleSubmitAddItem(event: any): void {
    // TODO: Trigger an on change strategy 
    this._itemService.addItem(event)
      .subscribe((item: Item): void => {
        this.items.push(item);
      });

    this._addToArchives(event);
  }

  handleSubmitEditItem(event: any): void {
    // TODO: Same as above 
    this._itemService.updateItem(event)
      .subscribe();

    this._addToArchives(event);
  }

  handleDeleteItem(event: any): void {
    // TODO: Same as above 
    this._itemService.deleteItem(event.id)
      .subscribe(() => {
        this.items = this.items.filter(item => item.id !== event.id);
      })
  }

  private _addToArchives(obj: any): void {
    const archive: ArchiveRequest = {
      type: 'Item',
      title: obj.title,
      amount: obj.amount
    }

    this._archiveService.addToArchives(archive).subscribe();
  }
}
