import { createSelector } from '@ngrx/store';

import { IAppState } from '../../../app-store/app.state';
import { IConfigState } from '../state/config.state';

const configState = (state: IAppState) => state.config;

export const selectGetConfig = createSelector(
  configState,
  (state: IConfigState) => state.config
);

export const selectConfigSuccess = createSelector(
  configState,
  (state: IConfigState) => state.config
);
