import { NgModule, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolOrdersAveragePerMinuteComponent } from './symbol-orders-average-per-minute.component';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { constructor } from 'q';

@NgModule({
  declarations: [SymbolOrdersAveragePerMinuteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SymbolOrdersAveragePerMinuteComponent
  ]
})
export class SymbolOrdersAveragePerMinuteModule {

}
