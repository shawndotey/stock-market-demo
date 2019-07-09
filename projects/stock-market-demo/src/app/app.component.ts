import { UserMode } from '@smd/core/config/model/user-mode.enum';
import { GetConfig, UpdateConfig } from './core/config/store/actions/config.actions';
import { Component, OnInit } from '@angular/core';
import { IAppState } from './core/app-store/app.state';
import { selectConfigSuccess } from './core/config/store/selectors/config.selector';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'smd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'the Stock Order Demo for the Company Sounding Like "Jim Lane"';

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetConfig());

  }
}
