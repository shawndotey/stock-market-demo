import { Injectable } from '@angular/core';
import { SymbolLookup } from './model/symbol-lookup.class';
import { delay, filter, debounceTime, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const SYMBOLS: SymbolLookup[] = [
  {name: 'Linen Cloth', symbol: 'BBBY'},
  {name: 'Google', symbol: 'GOOG'},
  {name: 'Bespin Gas', symbol: 'COG'},
  {name: 'Apple', symbol: 'AAPL'},
  {name: 'Elerium', symbol: 'EMR'},


];



@Injectable({
  providedIn: 'root'
})
export class StockSymbolLookupService {
  protected symbols: SymbolLookup[] = SYMBOLS;
  constructor() {

  }
  findMatchingSymbols$( criteria: string): Observable<SymbolLookup[]> {

    const finder$ = new Observable<SymbolLookup[]>(observer => {
      console.log('findSymbol$ finder$ criteria', criteria);
      if (!this.symbols) {
        observer.next([]);
        observer.complete();
        return;
      }

      const filteredSymbols = this.symbols.filter(symbol => symbol.name.toLowerCase().indexOf(criteria) > -1);
      observer.next(filteredSymbols);
      observer.complete();
    })
    .pipe(
      // simulate server
      delay(100),
    );
    return finder$;
  }

}
