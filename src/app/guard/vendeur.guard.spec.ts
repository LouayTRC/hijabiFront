import { TestBed } from '@angular/core/testing';

import { VendeurGuard } from './vendeur.guard';

describe('VendeurGuard', () => {
  let guard: VendeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
