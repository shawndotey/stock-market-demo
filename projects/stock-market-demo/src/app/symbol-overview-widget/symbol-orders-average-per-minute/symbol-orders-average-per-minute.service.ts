import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketOrder } from '@smd/core/order-que/model/market-order.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymbolOrdersAveragePerMinuteService {
  public averagePrice$: Observable<number>;
  public minPrice$: Observable<number>;
  public maxPrice$: Observable<number>;
  public ordersLastMinute$: Observable<MarketOrder[]>;
  constructor() { }

  public getOrdersFromLastMinute$(orders$: Observable<MarketOrder[]>) {
    return orders$.pipe(
      map(orders => {
        const now = Date.now();
        return orders.filter(order => {
          const seconds = Math.floor((now - order.timestamp) / 1000);
          const interval = Math.floor(seconds / 60);
          return (interval <= 1);
        });
      })
    );
  }

  public getAverage$(orders$: Observable<MarketOrder[]>) {
    return this.getOrdersFromLastMinute$(orders$).pipe(
      map(
        orders => {
          let total = 0;
          orders.forEach(order => {
            total = total + order.price;
          });
          const average = total / orders.length;
          return Math.round(average * 100) / 100;
        }
      )
    );
  }

  public getMax$(orders$: Observable<MarketOrder[]>) {
    return this.getOrdersFromLastMinute$(orders$).pipe(
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
  }

  public getMin$(orders$: Observable<MarketOrder[]>) {
    return this.getOrdersFromLastMinute$(orders$).pipe(
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
  }
}
