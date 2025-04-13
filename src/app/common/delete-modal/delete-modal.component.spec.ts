import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  const mockDialogRef = {
    onCancel: jasmine.createSpy('onCancel'),
    onConfirm: jasmine.createSpy('onClose')
  }

  const mockDeleteData = {
    data: { title: 'Test Title' }
  }
  
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: mockDeleteData}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
