import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { SavingService } from './saving.service';

describe('SavingService', () => {
  let service: SavingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(SavingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
