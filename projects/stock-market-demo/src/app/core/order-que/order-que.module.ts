import { DynamicScriptLoaderModule } from './../dynamic-script-loader/dynamic-script-loader.module';
import { OrderQueService } from './order-que.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '@smd/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    DynamicScriptLoaderModule
  ],
  providers: [
    OrderQueService
  ],
  exports: [
  ]
})
export class OrderQueModule {}
