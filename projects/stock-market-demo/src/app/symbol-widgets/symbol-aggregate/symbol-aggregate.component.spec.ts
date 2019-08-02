import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolAggregateComponent } from './symbol-aggregate.component';

describe('SymbolAggregateComponent', () => {
  let component: SymbolAggregateComponent;
  let fixture: ComponentFixture<SymbolAggregateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolAggregateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolAggregateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
