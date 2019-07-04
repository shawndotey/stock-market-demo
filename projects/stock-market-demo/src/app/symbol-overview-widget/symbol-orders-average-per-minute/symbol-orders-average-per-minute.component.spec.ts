import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolOrdersAveragePerMinuteComponent } from './symbol-orders-average-per-minute.component';

describe('SymbolOrdersAveragePerMinuteComponent', () => {
  let component: SymbolOrdersAveragePerMinuteComponent;
  let fixture: ComponentFixture<SymbolOrdersAveragePerMinuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolOrdersAveragePerMinuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolOrdersAveragePerMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
