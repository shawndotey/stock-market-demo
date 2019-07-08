import { SymbolAggregateModule } from './../symbol-aggregate/symbol-aggregate.module';
import { MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolOrdersPerMinuteComponent } from './symbol-orders-per-minute.component';

@NgModule({
  declarations: [SymbolOrdersPerMinuteComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    SymbolAggregateModule
  ],
  exports: [
    SymbolOrdersPerMinuteComponent
  ]
})
export class SymbolOrdersAveragePerMinuteModule {

}
