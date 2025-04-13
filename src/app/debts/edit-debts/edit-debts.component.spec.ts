import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebtsComponent } from '../debts.component';
import { EditDebtsComponent } from './edit-debts.component';

describe('EditDebtsComponent', () => {
  let component: EditDebtsComponent;
  let debtsComponent: DebtsComponent;
  let debtsFixture: ComponentFixture<DebtsComponent>;
  let fixture: ComponentFixture<EditDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDebtsComponent, BrowserAnimationsModule],
      providers: [
      ]
    })
    .compileComponents();

    // debtsFixture = TestBed.createComponent(DebtsComponent);
    // debtsComponent = debtsFixture.componentInstance;

    fixture = TestBed.createComponent(EditDebtsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // debtsComponent.editDebtWindowIsOpen = true;
    // debtsFixture.detectChanges();
    // await debtsFixture.whenStable();

    expect(component).toBeTruthy();
  });
  
  // it('should not be rendered when edit button was not clicked on DebtsComponent', async () => {
  //   debtsComponent.editDebtWindowIsOpen = false;
  //   debtsFixture.detectChanges();
  //   await debtsFixture.whenStable();
    
  //   expect(component).toBeFalsy();
  // });
});
