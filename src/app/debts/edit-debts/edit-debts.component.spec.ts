import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDebtsComponent } from './edit-debts.component';

describe('EditDebtsComponent', () => {
  let component: EditDebtsComponent;
  let fixture: ComponentFixture<EditDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDebtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
