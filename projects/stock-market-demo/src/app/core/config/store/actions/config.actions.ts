import { Action } from '@ngrx/store';

import { IConfig } from '../../model/config.interface';

export enum EConfigActions {
  GetConfig = '[Config] Get Config',
  GetConfigSuccess = '[Config] Get Config Success',
  UpdateConfig = '[Config] Update Config'
}

export class GetConfig implements Action {
  public readonly type = EConfigActions.GetConfig;
}

export class UpdateConfig implements Action {
  public readonly type = EConfigActions.UpdateConfig;
  constructor(public payload: IConfig) {}
}

export class GetConfigSuccess implements Action {
  public readonly type = EConfigActions.GetConfigSuccess;
  constructor(public payload: IConfig) {}
}

export type ConfigActions =
  | GetConfig
  | GetConfigSuccess
  | UpdateConfig;

