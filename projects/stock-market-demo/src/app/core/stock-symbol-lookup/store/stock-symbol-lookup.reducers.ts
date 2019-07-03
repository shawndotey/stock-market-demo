import { SearchSymbolActions, ESearchSymbolActions } from './stock-symbol-lookup.actions';

export const stockSymbolLookupReducers = (
 state = null,
 action: SearchSymbolActions
) => {
 switch (action.type) {
   case ESearchSymbolActions.SearchingStart: {
     return {
       ...state,
       symbolCriteria: action.payload
     };
   }
   case ESearchSymbolActions.SearchingStop: {
     return {
       ...state,
       symbolCriteria: action.payload
     };
   }
   case ESearchSymbolActions.SearchComplete: {
    return {
      ...state,
      symbolResults: action.payload
    };
  }

   default:
     return state;
 }
};
