import { SymbolOrdersAveragePerMinuteModule } from './symbol-orders-average-per-minute/symbol-orders-per-minute.module';
import { SymbolSearchBarModule } from './symbol-search-bar/symbol-search-bar.module';
import { SymbolOrdersTableModule } from './symbol-orders-table/symbol-orders-table.module';
import { NgModule } from '@angular/core';
import { OrderQueModule } from '@smd/core/order-que/order-que.module';
import { SymbolOverviewWidgetModule } from './symbol-overview-widget/symbol-overview-widget.module';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    OrderQueModule,
    SymbolOverviewWidgetModule
  ],
  exports: [
    SymbolOverviewWidgetModule
  ]
})
export class SymbolWidgetsModule { }
