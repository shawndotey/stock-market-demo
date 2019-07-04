import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, takeUntil, map } from 'rxjs/operators';
import { MarketOrder } from '@smd/core/order-que/model/market-order.class';

@Component({
  selector: 'smd-symbol-orders-average-per-minute',
  templateUrl: './symbol-orders-average-per-minute.component.html',
  styleUrls: ['./symbol-orders-average-per-minute.component.scss']
})
export class SymbolOrdersAveragePerMinuteComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() stockSymbol: string;
constructor(
    private orderQueService: OrderQueService
  ) {

  }
  protected averagePrice$: Observable<number>;
  protected minPrice$: Observable<number>;
  protected maxPrice$: Observable<number>;
  private _onDestroy = new Subject<void>();
  private stockSymbol$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  ngOnInit() {
    this.initStockSymbol();
  }
  ngOnChanges(changes) {
    console.log('ngOnChanges changes.stockSymbol', changes.stockSymbol.currentValue);
    this.stockSymbol$.next(changes.stockSymbol.currentValue);
    // changes.prop contains the old and the new value...
  }
  initStockSymbol() {
    const orders$: Observable<MarketOrder[]> = this.stockSymbol$.pipe(
      filter(symbol => !!symbol),
      mergeMap(symbol => this.orderQueService.getOrdersBySymbol$(symbol, 1000)),
      takeUntil(this._onDestroy)
    );

    const ordersLastMinute$ = orders$.pipe(

      map(orders => {
        const now = Date.now();

        return orders.filter(order => {
          const seconds = Math.floor((now - order.timestamp) / 1000);
          const interval = Math.floor(seconds / 60);
          return (interval <= 1 );
        });
      }),
      takeUntil(this._onDestroy)
      );


    this.averagePrice$ = ordersLastMinute$.pipe(
      map(
        orders => {
          let total = 0;
          orders.forEach(order => {
            total = total + order.price;
          });
          const average = total / orders.length;
          console.log(total,  orders.length);
          return Math.round(average * 100) / 100;
        }
      )
    );
    this.maxPrice$ = ordersLastMinute$.pipe(
      map(
        orders => {
          let max = 0;
          orders.forEach(order => {
            max = max < order.price ? order.price : max;
          });
          return Math.round(max * 100) / 100;
        }
      )
    );
    this.minPrice$ = ordersLastMinute$.pipe(
      map(
        orders => {
          let min = null;
          orders.forEach(order => {
            min = min > order.price || min === null ? order.price : min;
          });
          return Math.round(min * 100) / 100;
        }
      )
    );

    this.stockSymbol$.next(this.stockSymbol);

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
