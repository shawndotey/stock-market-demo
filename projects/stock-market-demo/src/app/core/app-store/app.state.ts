import { initialConfigState, IConfigState } from '../config/store/state/config.state';


export interface IAppState {
  config: IConfigState;
}

export const initialAppState: IAppState = {
  config: initialConfigState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
