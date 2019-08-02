/// derived from https://stackblitz.com/edit/angular-material-table-responsive
import { OrderQueModule } from '@smd/core/order-que/order-que.module';
import { NgModule } from '@angular/core';
import { SymbolOrdersTableComponent } from './symbol-orders-table.component';
import { MatMenuModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [SymbolOrdersTableComponent],
  imports: [
    SharedModule,
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
