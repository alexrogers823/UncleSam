import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DebtsComponent } from './debts/debts.component';
import { ItemsComponent } from './items/items.component';
import { SavingsComponent } from './savings/savings.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DebtsComponent,
    SavingsComponent,
    ItemsComponent,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
