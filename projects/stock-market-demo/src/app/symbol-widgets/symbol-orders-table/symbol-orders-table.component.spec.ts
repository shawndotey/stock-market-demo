import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolOrdersTableComponent } from './symbol-orders-table.component';

describe('SymbolOrdersTableComponent', () => {
  let component: SymbolOrdersTableComponent;
  let fixture: ComponentFixture<SymbolOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
