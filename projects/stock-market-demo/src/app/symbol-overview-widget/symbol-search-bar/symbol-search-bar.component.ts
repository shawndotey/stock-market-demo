import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Observable, observable } from 'rxjs';
import { filter, tap, takeUntil, debounceTime, map, delay, mergeMap } from 'rxjs/operators';
import { StockSymbolLookupService } from '@smd/core/stock-symbol-lookup/stock-symbol-lookup.service';
import { SymbolLookup } from '@smd/core/stock-symbol-lookup/model/symbol-lookup.class';
import { debug } from 'util';


@Component({
  selector: 'smd-symbol-search-bar',
  templateUrl: './symbol-search-bar.component.html',
  styleUrls: ['./symbol-search-bar.component.scss']
})
export class SymbolSearchBarComponent implements OnInit, OnDestroy {
  @Output() symbolUpdate: Observable<SymbolLookup>;
  @Input() initalSymbol: string;
  constructor(
    private symbolLookup: StockSymbolLookupService
  ) { }

  public searchBarCtrl: FormControl = new FormControl();
  public symbolFilteringCtrl: FormControl = new FormControl();
  public searching = false;
  // public  filteredSymbols: ReplaySubject<SymbolLookup[]> = new ReplaySubject<SymbolLookup[]>(1);
  public filteredSymbols: Observable<SymbolLookup[]>;
  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    if (this.initalSymbol) {
      this.symbolLookup.findMatchingSymbols$(this.initalSymbol).toPromise().then(val => {

        const first = val[0];
        console.log(this.initalSymbol, first);
        if (first) {
          this.searchBarCtrl.setValue(first);
        }

      });

    }

    this.filteredSymbols = this.symbolFilteringCtrl.valueChanges.pipe(
      debounceTime(350),
      filter(text => !!text),
      tap((text) => {
        console.log('searching = true');
        this.searching = true;
      }),
      mergeMap(search => this.symbolLookup.findMatchingSymbols$(search)),
      takeUntil(this._onDestroy),
    );

    // this.filteredSymbols =  this.symbolLookup.getSearchFilter$(releventSymbolSearchValueChanges).pipe(
    //   takeUntil(this._onDestroy),
    // );

    this.filteredSymbols.subscribe(filteredSymbols => {
      console.log('searching = false');
      this.searching = false;
      // this.filteredSymbols.next(filteredSymbols);
    }, error => {
      console.log('searching = false error');
      this.searching = false;
      // handle error...
    }
    );
    this.initSymbolUpdate();


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
