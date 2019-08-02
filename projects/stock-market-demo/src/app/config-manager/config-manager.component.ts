import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UserMode } from '@smd/core/config/model/user-mode.enum';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@smd/core/app-store/app.state';
import { selectConfigSuccess } from '@smd/core/config/store/selectors/config.selector';
import { UpdateConfig } from '@smd/core/config/store/actions/config.actions';
import { IConfig } from '@smd/core/config/model/config.interface';
import { LevelKeys } from './model/level-keys';

@Component({
  selector: 'smd-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss']
})
export class ConfigManagerComponent implements OnInit, OnDestroy {

  constructor(private store: Store<IAppState>) {}

  public currentUserMode: LevelKeys;
  public configForm = new FormGroup({
    userMode: new FormControl('', [])
  });
  public levelKeys: LevelKeys[] = [];

  protected config$ = this.store.pipe(select(selectConfigSuccess));
  protected currentConfig: IConfig;
  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.buildLevelKeys();
    this.setDemoValue();
    this.subscribeConfigToUserMode();
    this.subscribeUserModeValueChangesToUpdateConfigStore();
  }

  buildLevelKeys() {
    for (const userModeKey of Object.keys(UserMode)) {
      this.levelKeys.push({ key: userModeKey , description:  UserMode[userModeKey] });
    }
  }

  // to demonstrate change in value, we set it to level one.
  setDemoValue() {
    this.configForm.controls.userMode.setValue(this.levelKeys[0]);
  }

  subscribeConfigToUserMode() {
    // userMode is now level 2 to demonstrate change in value after store subscribe, per environment data.
    this.config$.subscribe(config => {
      if (!config) { return; }
      const userModeKey = config.userMode;
      const matchUserMode = this.levelKeys.filter(levelKey => levelKey.key === userModeKey)[0];
      if (matchUserMode) {
        this.configForm.controls.userMode.setValue(matchUserMode);
        this.currentUserMode = matchUserMode;
        this.currentConfig = config;
      }
    });
  }

  subscribeUserModeValueChangesToUpdateConfigStore() {
    this.configForm.controls.userMode.valueChanges.subscribe(changedLevelKey => {
      const matchUserMode = this.levelKeys.filter(levelKey => levelKey.key === changedLevelKey.key)[0];
      if (matchUserMode && this.currentUserMode && matchUserMode !== this.currentUserMode) {
        this.currentConfig.userMode = matchUserMode.key as UserMode;
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
