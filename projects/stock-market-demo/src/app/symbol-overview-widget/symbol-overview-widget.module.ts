import { SymbolOrdersAveragePerMinuteModule } from './symbol-orders-average-per-minute/symbol-orders-average-per-minute.module';
import { SymbolSearchBarModule } from './symbol-search-bar/symbol-search-bar.module';
import { SymbolOrdersTableModule } from './symbol-orders-table/symbol-orders-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmdSymbolOverviewWidgetComponent } from './symbol-overview-widget.component';
import { OrderQueModule } from '@smd/core/order-que/order-que.module';

@NgModule({
  declarations: [SmdSymbolOverviewWidgetComponent],
  imports: [
    CommonModule,
    OrderQueModule,
    SymbolOrdersTableModule,
    SymbolSearchBarModule,
    SymbolOrdersAveragePerMinuteModule
  ],
  providers: [
  ],
  exports: [
    SmdSymbolOverviewWidgetComponent
  ]
})
export class SymbolOverviewWidgetModule { }
