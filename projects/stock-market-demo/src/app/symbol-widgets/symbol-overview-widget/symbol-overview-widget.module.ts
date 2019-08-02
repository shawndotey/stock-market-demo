import { NgModule } from '@angular/core';
import { SmdSymbolOverviewWidgetComponent } from './symbol-overview-widget.component';
import { SymbolOrdersTableModule } from '../symbol-orders-table/symbol-orders-table.module';
import { SymbolSearchBarModule } from '../symbol-search-bar/symbol-search-bar.module';
import { SymbolOrdersAveragePerMinuteModule } from '../symbol-orders-average-per-minute/symbol-orders-per-minute.module';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [SmdSymbolOverviewWidgetComponent],
  imports: [
    SharedModule,
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
