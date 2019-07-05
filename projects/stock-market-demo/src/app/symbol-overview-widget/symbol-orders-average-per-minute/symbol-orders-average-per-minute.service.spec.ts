import { TestBed } from '@angular/core/testing';

import { SymbolOrdersAveragePerMinuteService } from './symbol-orders-average-per-minute.service';

describe('SymbolOrdersAveragePerMinuteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymbolOrdersAveragePerMinuteService = TestBed.get(SymbolOrdersAveragePerMinuteService);
    expect(service).toBeTruthy();
  });
});
