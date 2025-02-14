import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
