import { DynamicScriptLoaderService } from './../dynamic-script-loader/dynamic-script-loader.service';
import { Script } from './../dynamic-script-loader/model/script.class';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, flatMap, concatMap, mergeAll} from 'rxjs/operators';
import { MarketOrder } from './model/market-order.class';
export const ScriptStore: Script[] = [
  {name: 'pubnub', src: 'https://cdn.pubnub.com/sdk/javascript/pubnub.4.21.7.js'},
];
export declare var PubNub: any;
// bid_price: 200.26605171237637
// order_quantity: 403
// symbol: "Apple"
// timestamp: 1562088056
// trade_type: "fill or kill"
@Injectable({
  providedIn: 'root'
})
export class OrderQueService {
  constructor(
    private scriptLoaderService: DynamicScriptLoaderService
  ) {
    console.log('OrderQueService constructor');
    this.initObservables();
    this.scriptLoaderService.addScripts(...ScriptStore);
    this.scriptLoaderService.load('pubnub').then(data => {


      this.pubnubMarketOrdersDemo = new PubNub({
        publishKey: 'pubnub-market-orders',
        subscribeKey: 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe'
      });

      this.attachObservablesToPubNub();

      this.pubnubMarketOrdersDemo.subscribe({
        channels: ['pubnub-market-orders']
      });


    }).catch(error => console.log(error));

  }
  private _order$ = new BehaviorSubject<MarketOrder>(new MarketOrder());
  order$: Observable<MarketOrder> = this._order$.asObservable();
  orders$: Observable<MarketOrder[]>;
  last10000Orders: MarketOrder[] = [];
  pubnubMarketOrdersDemo;
  lastid = -1;
  getOrdersBySymbol$(symbol: string, max = 100): Observable<MarketOrder[]> {
    symbol = symbol.toLowerCase();
    const filteredMarketOrders = [];
    // flatMap
    const ordersBySymbol$ = this.orders$.pipe(
      map(orders => {
        const filteredOrders = orders.filter(order => {
          return order.symbol === symbol;
        });
        filteredOrders.splice(max);
        return filteredOrders;
      }),
      // this.mapTo<MarketOrder>(filteredMarketOrders, max)
    );
    return ordersBySymbol$;
  }
  initObservables() {
    this.orders$ = this.order$.pipe(
      this.mapTo<MarketOrder>(this.last10000Orders, 10000),
    );
  }
  mapTo<type>(list: type[], max: number) {
    return map(marketOrder => {
      list.unshift(marketOrder as type);
      list.splice(max);
      return list;
    });
  }
  private attachObservablesToPubNub() {
    this.attachMarketOrderObservable();
  }
  private attachMarketOrderObservable() {
    this.pubnubMarketOrdersDemo.addListener({
      message: (data) => {
        this.handlePubnubData(data);
      }
    });
  }

  handlePubnubData(data) {
    const marketOrder = this.convertDataToMarketOrder(data);
    if (marketOrder) {
      this._order$.next(marketOrder);
    }
  }
  private convertDataToMarketOrder(data): MarketOrder {
    if  (!data || !data.message) { return null; }
    return this.convertMessageToMarketOrder(data.message);
  }
  private convertMessageToMarketOrder(message): MarketOrder {
    const marketOrder = new MarketOrder();
    marketOrder.price = message.bid_price;
    marketOrder.quantity = message.order_quantity;
    marketOrder.timestamp = message.timestamp;
    marketOrder.type = message.trade_type;
    marketOrder.symbol = message.symbol.toLowerCase();
    marketOrder.id = ++this.lastid;
    return marketOrder;
  }
}
