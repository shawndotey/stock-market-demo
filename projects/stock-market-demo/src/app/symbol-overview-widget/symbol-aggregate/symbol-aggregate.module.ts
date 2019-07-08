import { MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolAggregateComponent } from './symbol-aggregate.component';

@NgModule({
  declarations: [SymbolAggregateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    SymbolAggregateComponent
  ]
})
export class SymbolAggregateModule { }
