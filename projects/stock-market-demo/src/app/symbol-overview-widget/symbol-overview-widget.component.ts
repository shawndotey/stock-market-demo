import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smd-symbol-overview-widget',
  templateUrl: './symbol-overview-widget.component.html',
  styleUrls: ['./symbol-overview-widget.component.scss']
})
export class SmdSymbolOverviewWidgetComponent implements OnInit {

  constructor() { }
  @Input() initalSymbol = 'goog';
  ngOnInit() {
  }

}
