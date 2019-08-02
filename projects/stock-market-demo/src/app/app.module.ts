import { ConfigManagerModule } from './config-manager/config-manager.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppCoreModule } from './core/app-core.module';
import { SymbolWidgetsModule } from './symbol-widgets/symbol-widgets.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SymbolWidgetsModule,
    ConfigManagerModule,
    AppCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
