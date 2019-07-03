/// derived from https://stackblitz.com/edit/angular-material-table-responsive
import { OrderQueModule } from '@smd/core/order-que/order-que.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolOrdersTableComponent } from './symbol-orders-table.component';
import { MatMenuModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SymbolOrdersTableComponent],
  imports: [
    CommonModule,
    OrderQueModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    SymbolOrdersTableComponent
  ]

})
export class SymbolOrdersTableModule { }
