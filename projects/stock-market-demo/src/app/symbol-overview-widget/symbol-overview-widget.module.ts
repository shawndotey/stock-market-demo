import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmdSymbolOverviewWidgetComponent } from './symbol-overview-widget.component';
import { OrderQueModule } from '@smd/core/order-que/order-que.module';

@NgModule({
  declarations: [SmdSymbolOverviewWidgetComponent],
  imports: [
    CommonModule,
    OrderQueModule
  ],
  exports: [
    SmdSymbolOverviewWidgetComponent
  ]
})
export class SymbolOverviewWidgetModule { }
