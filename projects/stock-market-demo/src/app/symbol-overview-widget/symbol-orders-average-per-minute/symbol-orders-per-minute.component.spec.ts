import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolOrdersPerMinuteComponent } from './symbol-orders-per-minute.component';

describe('SymbolOrdersAveragePerMinuteComponent', () => {
  let component: SymbolOrdersPerMinuteComponent;
  let fixture: ComponentFixture<SymbolOrdersPerMinuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolOrdersPerMinuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolOrdersPerMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
