import { DynamicScriptLoaderService } from './../dynamic-script-loader/dynamic-script-loader.service';
import { Script } from './../dynamic-script-loader/model/script.class';
import { Injectable } from '@angular/core';

export const ScriptStore: Script[] = [
  {name: 'pubnub', src: 'https://cdn.pubnub.com/sdk/javascript/pubnub.4.21.7.js'},
];
export declare var PubNub: any;

@Injectable({
  providedIn: 'root'
})
export class OrderQueService {

  constructor(
    private scriptLoaderService: DynamicScriptLoaderService
  ) {
    console.log('OrderQueService constructor');
    this.scriptLoaderService.addScripts(...ScriptStore);
    this.scriptLoaderService.load('pubnub').then(data => {
      console.log('script loaded ', PubNub);


      const pubnubDemo = new PubNub({
        publishKey: 'pubnub-market-orders',
        subscribeKey: 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe'
      });

      pubnubDemo.addListener({
        message(data) {
          // console.log(message);
        }
      });

      pubnubDemo.subscribe({
        channels: ['pubnub-market-orders']
      });


    }).catch(error => console.log(error));




  }
}
