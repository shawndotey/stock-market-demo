import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../app-store/app.state';
import { configReducers } from '../config/store/reducers/config.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  config: configReducers
};
