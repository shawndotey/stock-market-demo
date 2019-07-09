import { IConfig } from '../../model/config.interface';


export interface IConfigState {
  config: IConfig;
}

export const initialConfigState: IConfigState = {
  config: null
};
