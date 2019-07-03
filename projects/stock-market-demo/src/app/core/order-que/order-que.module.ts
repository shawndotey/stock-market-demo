import { DynamicScriptLoaderModule } from './../dynamic-script-loader/dynamic-script-loader.module';
import { OrderQueService } from './order-que.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicScriptLoaderModule
  ],
  providers: [
    OrderQueService
  ],
  exports: [
  ]
})
export class OrderQueModule {
constructor() {


}

}
