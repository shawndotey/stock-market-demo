import { TestBed } from '@angular/core/testing';

import { OrderQueService } from './order-que.service';

describe('OrderQueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderQueService = TestBed.get(OrderQueService);
    expect(service).toBeTruthy();
  });
});
