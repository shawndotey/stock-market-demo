import { createAction, Action } from '@ngrx/store';
import { SymbolLookup } from '../model/symbol-lookup.class';


export enum ESearchSymbolActions {
 SearchingStart = '[stock-symbol-lookup] Searching Started',
 SearchingStop = '[stock-symbol-lookup] Searching Stopped',
 SearchComplete = '[stock-symbol-lookup] Search Complete',
}

export class SearchingStartAction implements Action {
 public readonly type = ESearchSymbolActions.SearchingStart;
 constructor(public payload: string) {}
}
export class SearchingStopAction implements Action {
 public readonly type = ESearchSymbolActions.SearchingStop;
 constructor(public payload: string) {}
}
export class SearchCompleteAction implements Action {
 public readonly type = ESearchSymbolActions.SearchComplete;
 constructor(public payload: SymbolLookup) {}
}
export type SearchSymbolActions = SearchingStartAction | SearchingStopAction | SearchCompleteAction;
