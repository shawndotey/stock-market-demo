import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigManagerComponent } from './config-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StockSymbolLookupModule } from '@smd/core/stock-symbol-lookup/stock-symbol-lookup.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [ConfigManagerComponent],
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
    ConfigManagerComponent
  ]
})
export class ConfigManagerModule { }
