import { MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SymbolAggregateComponent } from './symbol-aggregate.component';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [SymbolAggregateComponent],
  imports: [
    SharedModule,
    MatFormFieldModule
  ],
  exports: [
    SymbolAggregateComponent
  ]
})
export class SymbolAggregateModule { }
