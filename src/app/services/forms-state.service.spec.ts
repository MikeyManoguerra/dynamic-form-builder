import { TestBed } from '@angular/core/testing';

import { FormsStateService } from './forms-state.service';

describe('FormsStateService', () => {
  let service: FormsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
