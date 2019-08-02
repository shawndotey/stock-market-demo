import { NgModule } from '@angular/core';
import { ConfigManagerComponent } from './config-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [ConfigManagerComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    StoreModule,
  ],
  exports: [
    ConfigManagerComponent
  ]
})
export class ConfigManagerModule { }
