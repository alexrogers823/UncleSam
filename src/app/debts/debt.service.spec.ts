import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { DebtService } from './debt.service';

describe('DebtService', () => {
  let service: DebtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(DebtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
