import { Observable } from 'rxjs';
import { Component, OnInit,  Input } from '@angular/core';

@Component({
  selector: 'smd-symbol-aggregate',
  templateUrl: './symbol-aggregate.component.html',
  styleUrls: ['./symbol-aggregate.component.scss']
})
export class SymbolAggregateComponent implements OnInit {
  @Input() protected title: string;
  @Input() protected aggregatePrice$: Observable<number>;
  constructor() { }



  ngOnInit() {
  }

}
