
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, takeUntil, map } from 'rxjs/operators';
import { MarketOrder } from '@smd/core/order-que/model/market-order.class';
import { SymbolOrdersAveragePerMinuteService } from './symbol-orders-average-per-minute.service';

@Component({
  selector: 'smd-symbol-orders-average-per-minute',
  templateUrl: './symbol-orders-average-per-minute.component.html',
  styleUrls: ['./symbol-orders-average-per-minute.component.scss'],
  providers: [
    SymbolOrdersAveragePerMinuteService
  ]
})
export class SymbolOrdersAveragePerMinuteComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() stockSymbol: string;
constructor(
    private orderQueService: OrderQueService,
    protected averageProvider: SymbolOrdersAveragePerMinuteService
  ) {

  }
  protected averagePrice$: Observable<number>;
  protected minPrice$: Observable<number>;
  protected maxPrice$: Observable<number>;
  protected filteredOrders$: Observable<MarketOrder[]>;
  private; _onDestroy = new Subject<void>();
  private stockSymbol$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  ngOnInit() {
    this.initStockSymbol();
    this.initAverages();
  }
  ngOnChanges(changes) {
    this.stockSymbol$.next(changes.stockSymbol.currentValue);
  }
  initStockSymbol() {
    this.filteredOrders$ = this.stockSymbol$.pipe(
      filter(symbol => !!symbol),
      mergeMap(symbol => this.orderQueService.getOrdersBySymbol$(symbol, 1000)),
      takeUntil(this._onDestroy)
    );

    this.stockSymbol$.next(this.stockSymbol);
  }
  initAverages() {

    this.averagePrice$ = this.averageProvider.getAverage$(this.filteredOrders$).pipe(
      takeUntil(this._onDestroy)
    );

    this.minPrice$ = this.averageProvider.getMin$(this.filteredOrders$).pipe(
      takeUntil(this._onDestroy)
    );

    this.maxPrice$ = this.averageProvider.getMax$(this.filteredOrders$).pipe(
      takeUntil(this._onDestroy)
    );

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
