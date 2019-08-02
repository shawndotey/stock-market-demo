import { GetConfig } from './core/config/store/actions/config.actions';
import { Component, OnInit } from '@angular/core';
import { IAppState } from './core/app-store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'smd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Stock Order Demo';

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetConfig());

  }
}
