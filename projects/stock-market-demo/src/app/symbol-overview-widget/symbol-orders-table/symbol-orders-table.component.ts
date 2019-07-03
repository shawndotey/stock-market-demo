import { MarketOrder } from '@smd/core//order-que/model/market-order.class';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { take } from 'rxjs/operators';


@Component({
  selector: 'smd-symbol-orders-table',
  templateUrl: './symbol-orders-table.component.html',
  styleUrls: ['./symbol-orders-table.component.scss'],
})
export class SymbolOrdersTableComponent implements OnInit , AfterViewInit {
  options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  displayedColumns = ['id', 'symbol', 'price'];
  dataSource: MatTableDataSource<MarketOrder>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private orderQueService: OrderQueService
  ) {
    this.dataSource = new MatTableDataSource([]);

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.orderQueService.getOrdersBySymbol$('google').subscribe(orders => {
      this.dataSource.data = orders;

    });

  }


}

