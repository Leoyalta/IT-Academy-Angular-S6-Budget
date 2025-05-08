import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('Budget1Service', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
