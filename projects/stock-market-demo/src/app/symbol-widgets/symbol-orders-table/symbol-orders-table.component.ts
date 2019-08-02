import { MarketOrder } from '@smd/core//order-que/model/market-order.class';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, mergeMap, filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'smd-symbol-orders-table',
  templateUrl: './symbol-orders-table.component.html',
  styleUrls: ['./symbol-orders-table.component.scss'],
})
export class SymbolOrdersTableComponent implements OnInit , AfterViewInit, OnDestroy, OnChanges {

  @Input() stockSymbol: string;
  @Input() searching$: Observable<boolean>;
  constructor(
    private orderQueService: OrderQueService
  ) {
    this.dataSource = new MatTableDataSource([]);

  }
  private stockSymbol$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _onDestroy = new Subject<void>();
  today: number = Date.now();

  displayedColumns = ['id', 'symbol', 'price'];
  dataSource: MatTableDataSource<MarketOrder>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.initStockSymbol();
  }
  initStockSymbol() {
    this.stockSymbol$.pipe(
      filter(symbol => !!symbol),
      switchMap(symbol => this.orderQueService.getOrdersBySymbol$(symbol, 10)),
      takeUntil(this._onDestroy)
    ).subscribe(orders => {
      this.dataSource.data = orders;
    });
    this.stockSymbol$.next(this.stockSymbol);
  }
  ngOnChanges(changes) {
    this.stockSymbol$.next(changes.stockSymbol.currentValue );
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}

