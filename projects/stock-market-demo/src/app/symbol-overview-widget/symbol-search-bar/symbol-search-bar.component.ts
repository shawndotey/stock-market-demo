import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Observable, observable, BehaviorSubject } from 'rxjs';
import { filter, tap, takeUntil, debounceTime, map, delay, mergeMap } from 'rxjs/operators';
import { StockSymbolLookupService, SYMBOLS } from '@smd/core/stock-symbol-lookup/stock-symbol-lookup.service';
import { SymbolLookup } from '@smd/core/stock-symbol-lookup/model/symbol-lookup.class';
import { debug } from 'util';


@Component({
  selector: 'smd-symbol-search-bar',
  templateUrl: './symbol-search-bar.component.html',
  styleUrls: ['./symbol-search-bar.component.scss']
})
export class SymbolSearchBarComponent implements OnInit, OnDestroy {


  SYMBOLS = SYMBOLS;

  @Output() symbolUpdate: Observable<SymbolLookup>;
  @Input() initalSymbol: string;
  @Output() searching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private symbolLookup: StockSymbolLookupService
  ) { }
  public currentSymbolLookup: SymbolLookup;
  public searchBarCtrl: FormControl = new FormControl();
  public symbolFilteringCtrl: FormControl = new FormControl();
  set searching(value) {
    this.searching$.next(value);
  }
  public filteredSymbols$: Observable<SymbolLookup[]>;
  public filteredSymbols: SymbolLookup[] = [];
  protected _onDestroy = new Subject<void>();

  ngOnInit() {


    this.filteredSymbols$ = this.symbolFilteringCtrl.valueChanges.pipe(
      debounceTime(350),
      filter(text => !!text),
      tap((text) => {
        this.searching = true;
      }),
      mergeMap(search => this.symbolLookup.findMatchingSymbols$(search)),
      takeUntil(this._onDestroy),
    );

    this.filteredSymbols$.subscribe(filteredSymbols => {
      this.filteredSymbols = filteredSymbols;
      this.searching = false;
    }, error => {
      this.searching = false;
      // handle error...
    });

    this.initSymbolUpdate();

    if (this.initalSymbol) {
      this.symbolLookup.findMatchingSymbols$(this.initalSymbol).toPromise().then(matchingSymbols => {

        const first = matchingSymbols[0];
        if (first) {
          this.searchBarCtrl.setValue(first);
          this.filteredSymbols = matchingSymbols;
          this.currentSymbolLookup = first;
        }
      });
    }
  }

  initSymbolUpdate() {

    this.symbolUpdate =  new Observable<SymbolLookup>( observable => {
      this.searchBarCtrl.valueChanges.pipe(
        takeUntil(this._onDestroy),
      ).subscribe(symbolLookup => {
        observable.next(symbolLookup);
      });
    });

  }

 ngOnDestroy() {
   this._onDestroy.next();
   this._onDestroy.complete();
 }

}
