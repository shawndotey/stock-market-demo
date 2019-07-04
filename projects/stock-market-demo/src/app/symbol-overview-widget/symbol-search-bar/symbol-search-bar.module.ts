import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolSearchBarComponent } from './symbol-search-bar.component';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { StockSymbolLookupModule } from '@smd/core/stock-symbol-lookup/stock-symbol-lookup.module';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [SymbolSearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    StockSymbolLookupModule,
    StoreModule,
  ],
  exports: [
    SymbolSearchBarComponent
  ]
})
export class SymbolSearchBarModule { }
