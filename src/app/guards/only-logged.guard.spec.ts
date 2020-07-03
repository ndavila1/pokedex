import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyLoggedGuard } from './only-logged.guard';

describe('OnlyLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedGuard]
    });
  });

  it('should ...', inject([OnlyLoggedGuard], (guard: OnlyLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
