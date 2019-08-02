import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmdSymbolOverviewWidgetComponent } from './symbol-overview-widget.component';

describe('SymbolOverviewWidgetComponent', () => {
  let component: SmdSymbolOverviewWidgetComponent;
  let fixture: ComponentFixture<SmdSymbolOverviewWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmdSymbolOverviewWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmdSymbolOverviewWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
