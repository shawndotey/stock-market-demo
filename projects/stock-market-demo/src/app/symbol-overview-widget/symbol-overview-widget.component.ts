import { Component, OnInit } from '@angular/core';
import { OrderQueService } from '@smd/core/order-que/order-que.service';

@Component({
  selector: 'smd-symbol-overview-widget',
  templateUrl: './symbol-overview-widget.component.html',
  styleUrls: ['./symbol-overview-widget.component.scss']
})
export class SmdSymbolOverviewWidgetComponent implements OnInit {

  constructor(
    private orderQueService: OrderQueService
  ) { }

  ngOnInit() {
    console.log('SmdSymbolOverviewWidgetComponent orderQueService', this.orderQueService);
  }

}
