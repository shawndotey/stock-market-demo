import { SymbolAggregateModule } from './../symbol-aggregate/symbol-aggregate.module';
import { MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SymbolOrdersPerMinuteComponent } from './symbol-orders-per-minute.component';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [SymbolOrdersPerMinuteComponent],
  imports: [
    SharedModule,
    MatFormFieldModule,
    SymbolAggregateModule
  ],
  exports: [
    SymbolOrdersPerMinuteComponent
  ]
})
export class SymbolOrdersAveragePerMinuteModule {

}
