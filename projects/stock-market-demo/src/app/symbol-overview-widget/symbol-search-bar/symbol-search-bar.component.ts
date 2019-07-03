import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, tap, takeUntil, debounceTime, map, delay } from 'rxjs/operators';
import { StockSymbolLookupService } from '@smd/core/stock-symbol-lookup/stock-symbol-lookup.service';
import { SymbolLookup } from '@smd/core/stock-symbol-lookup/model/symbol-lookup.class';
// import { delay } from 'q';




/** list of banks */
export const SYMBOLS: SymbolLookup[] = [
  {name: 'Bank A', symbol: 'A'},
  {name: 'Bank B', symbol: 'B'},
  {name: 'Bank C', symbol: 'C'},
  {name: 'Bank D', symbol: 'D'},
  {name: 'Bank E', symbol: 'E'},

];



@Component({
  selector: 'smd-symbol-search-bar',
  templateUrl: './symbol-search-bar.component.html',
  styleUrls: ['./symbol-search-bar.component.scss']
})
export class SymbolSearchBarComponent implements OnInit, OnDestroy {

  constructor(
    private symbolLookup: StockSymbolLookupService
  ) { }

 /** list of banks */
 protected symbols: SymbolLookup[] = SYMBOLS;

 /** control for the selected bank for server side filtering */
 public bankServerSideCtrl: FormControl = new FormControl();

 /** control for filter for server side. */
 public symbolFilteringCtrl: FormControl = new FormControl();

 /** indicate search operation is in progress */
 public searching = false;

 /** list of banks filtered after simulating server side search */
 public  filteredSymbols: ReplaySubject<SymbolLookup[]> = new ReplaySubject<SymbolLookup[]>(1);

 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();

 ngOnInit() {

   // listen for search field value changes
   this.symbolFilteringCtrl.valueChanges
     .pipe(
       filter(search => !!search),
       tap(() => this.searching = true),
       debounceTime(200),
       map(search => {
         if (!this.symbols) {
           return [];
         }

         // simulate server fetching and filtering data
         return this.symbols.filter(bank => bank.name.toLowerCase().indexOf(search) > -1);
       }),
       delay(130),
       takeUntil(this._onDestroy),
     )
     .subscribe(filteredBanks => {
       this.searching = false;
       this.filteredSymbols.next(filteredBanks);
     },
       error => {
         // no errors in our simulated example
         this.searching = false;
         // handle error...
       });

 }

 ngOnDestroy() {
   this._onDestroy.next();
   this._onDestroy.complete();
 }

}
