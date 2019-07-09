import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SymbolLookup } from '@smd/core/stock-symbol-lookup/model/symbol-lookup.class';
import { FormControl, FormGroup } from '@angular/forms';
import { UserMode } from '@smd/core/config/model/user-mode.enum';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@smd/core/app-store/app.state';
import { selectConfigSuccess } from '@smd/core/config/store/selectors/config.selector';
import { UpdateConfig } from '@smd/core/config/store/actions/config.actions';
import { IConfig } from '@smd/core/config/model/config.interface';

export class LevelKeys {
  key: string;
  description: string;
}

@Component({
  selector: 'smd-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss']
})
export class ConfigManagerComponent implements OnInit {

  constructor(private store: Store<IAppState>) {}

  protected _onDestroy = new Subject<void>();
  public filteredSymbols: SymbolLookup[] = [];
  public currentUserMode: LevelKeys;
  public configForm = new FormGroup({
    userMode: new FormControl('', [])
  });
  protected config$ = this.store.pipe(select(selectConfigSuccess));
  public levelKeys: LevelKeys[] = [];
  private currentConfig: IConfig;
  ngOnInit() {

    for (const userModeKey of Object.keys(UserMode)) {
      this.levelKeys.push({ key: userModeKey , description:  UserMode[userModeKey] });
      // console.log(userModeKey , UserMode[userModeKey] );
    }
    // to demonstrate change in value, we set it to level one.
    this.configForm.controls.userMode.setValue(this.levelKeys[0]);
    // to demonstrate change in value after store subscribe, userMode is now level 2.
    this.config$.subscribe(config => {
      // console.log('possible selectConfigSuccess', config);
      if (!config) { return; }
      console.log('selectConfigSuccess', config);
      const userModeKey = config.userMode;
      const matchUserMode = this.levelKeys.filter(levelKey => levelKey.key === userModeKey)[0];
      if (matchUserMode) {
        this.configForm.controls.userMode.setValue(matchUserMode);
        this.currentUserMode = matchUserMode;
        this.currentConfig = config;
      }

    });

    this.configForm.controls.userMode.valueChanges.subscribe(changedLevelKey => {
        const matchUserMode = this.levelKeys.filter(levelKey => levelKey.key === changedLevelKey.key)[0];
        if (matchUserMode && this.currentUserMode && matchUserMode !== this.currentUserMode) {
          this.currentConfig.userMode = matchUserMode.key as UserMode;
          console.log('value different', this.currentConfig);
          this.currentUserMode = matchUserMode;
          this.store.dispatch(new UpdateConfig(Object.assign({}, this.currentConfig)));
        }

    });
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();


  }
}
