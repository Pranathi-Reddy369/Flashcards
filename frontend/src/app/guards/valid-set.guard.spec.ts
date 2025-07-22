import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validSetGuard } from './valid-set.guard';

describe('validSetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validSetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
