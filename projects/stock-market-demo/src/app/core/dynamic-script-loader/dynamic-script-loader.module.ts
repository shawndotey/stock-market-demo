import { SharedModule } from '@smd/shared/shared.module';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    DynamicScriptLoaderService
  ]
})
export class DynamicScriptLoaderModule { }
