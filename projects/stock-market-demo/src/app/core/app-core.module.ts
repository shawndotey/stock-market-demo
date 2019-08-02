import { HttpClientModule } from '@angular/common/http';
import { ConfigModule } from './config/config.module';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app-store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './config/store/effects/config.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigManagerModule } from '../config-manager/config-manager.module';


@NgModule({
  declarations: [],
  imports: [
    ConfigModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ConfigEffects]),
    StoreDevtoolsModule.instrument(),
    ConfigManagerModule,
  ],
  exports: [
  ]
})
export class AppCoreModule { }
