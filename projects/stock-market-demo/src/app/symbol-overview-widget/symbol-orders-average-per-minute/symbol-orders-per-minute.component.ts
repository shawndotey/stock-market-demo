
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, takeUntil, map, tap, switchMap } from 'rxjs/operators';
import { MarketOrder } from '@smd/core/order-que/model/market-order.class';
import { SymbolOrdersPerMinuteService } from './symbol-orders-per-minute.service';


@Component({
  selector: 'smd-symbol-orders-per-minute',
  templateUrl: './symbol-orders-per-minute.component.html',
  styleUrls: ['./symbol-orders-per-minute.component.scss'],
  providers: [
    SymbolOrdersPerMinuteService
  ]
})
export class SymbolOrdersPerMinuteComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() stockSymbol: string;

  constructor(
    private orderQueService: OrderQueService,
    protected averageProvider: SymbolOrdersPerMinuteService
  ) {}

  protected TIME_FRAME = 60;
  protected averagePrice$: Observable<number>;
  protected minPrice$: Observable<number>;
  protected maxPrice$: Observable<number>;
  protected filteredOrders$: Observable<MarketOrder[]>;
  private _onDestroy = new Subject<void>();
  private stockSymbol$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  ngOnInit() {
    this.initFilteredOrders();
    this.initStockSymbol();
    this.initAverages();
  }
  ngOnChanges(changes) {
    this.stockSymbol$.next(changes.stockSymbol.currentValue);
  }
  initFilteredOrders() {
    this.filteredOrders$ = this.stockSymbol$.pipe(
      filter(symbol => !!symbol),
      switchMap(symbol => this.orderQueService.getOrdersBySymbol$(symbol, 1000)),
      takeUntil(this._onDestroy)
    );
  }
  initStockSymbol() {
    this.stockSymbol$.next(this.stockSymbol);
  }
  initAverages() {

    this.averagePrice$ = this.averageProvider.getAverage$(this.filteredOrders$, this.TIME_FRAME).pipe(
      takeUntil(this._onDestroy)
    );

    this.minPrice$ = this.averageProvider.getMin$(this.filteredOrders$, this.TIME_FRAME).pipe(
      takeUntil(this._onDestroy)
    );

    this.maxPrice$ = this.averageProvider.getMax$(this.filteredOrders$, this.TIME_FRAME).pipe(
      takeUntil(this._onDestroy)
    );

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
