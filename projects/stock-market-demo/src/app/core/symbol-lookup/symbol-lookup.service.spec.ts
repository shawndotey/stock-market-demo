import { TestBed } from '@angular/core/testing';

import { SymbolLookupService } from './symbol-lookup.service';

describe('SymbolLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymbolLookupService = TestBed.get(SymbolLookupService);
    expect(service).toBeTruthy();
  });
});
