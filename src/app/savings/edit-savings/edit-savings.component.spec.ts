import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditSavingsComponent } from './edit-savings.component';

describe('EditSavingsComponent', () => {
  let component: EditSavingsComponent;
  let fixture: ComponentFixture<EditSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSavingsComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSavingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
