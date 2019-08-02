import { TestBed } from '@angular/core/testing';

import { SymbolOrdersPerMinuteService } from './symbol-orders-per-minute.service';

describe('SymbolOrdersAveragePerMinuteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymbolOrdersPerMinuteService = TestBed.get(SymbolOrdersPerMinuteService);
    expect(service).toBeTruthy();
  });
});
