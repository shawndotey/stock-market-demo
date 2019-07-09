import { UpdateConfig } from './../actions/config.actions';

import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { IConfig } from '../../model/config.interface';
import { ConfigService } from '../../config.service';
import { EConfigActions, GetConfig, GetConfigSuccess } from '../actions/config.actions';

@Injectable()
export class ConfigEffects {
  @Effect()
  getConfig$ = this.actions$.pipe(
    ofType<GetConfig>(EConfigActions.GetConfig),
    switchMap(() => this.configService.getConfig()),
    switchMap((config: IConfig) => {
      return of(new GetConfigSuccess(config));
    })
  );

  @Effect()
  updateConfig$ = this.actions$.pipe(
    ofType<UpdateConfig>(EConfigActions.UpdateConfig),
    map((action) => action.payload),
    switchMap((config: IConfig) => {
      return of(new GetConfigSuccess(config));
    })
  );

  constructor(
    private configService: ConfigService,
    private actions$: Actions) {}
}
