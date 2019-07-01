/// derived from https://stackoverflow.com/a/42766146/2040763
import { Injectable } from '@angular/core';
import { Script } from './model/script.class';
import { ScriptStore } from './model/script-store.class';

declare var document: any;


@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scriptStores: { [s: string]: ScriptStore } = {};

  constructor() {
  }
  addScripts(...scripts: Script[]) {
    scripts.forEach((script: Script) => {
      this.scriptStores[script.name] = {
        loaded: false,
        src: script.src,
      };
    });
  }

  load(...scripts: string[]) {
    if (typeof window === 'object') {
      const promises: any[] = [];
      scripts.forEach((script) => promises.push(this.loadScript(script)));
      return Promise.all(promises);
    } else {
      /// todo - create server side loading
      throw new Error('front end only loading');
    }
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scriptStores[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = this.createDocumentScript(resolve, name);
        this.appendScript(script);
      }
    });
  }
  private appendScript(script) {
    console.log();
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  private createDocumentScript(resolve, name: string): any {
    const documentScript = document.createElement('script');
    documentScript.type = 'text/javascript';
    documentScript.src = this.scriptStores[name].src;
    if (documentScript.readyState) {  // IE
      this.buildScriptOnReady(documentScript, resolve);
    } else {  // Others
      this.buildOnLoad(documentScript, resolve, name);
    }
    documentScript.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
    return documentScript;
  }
  private buildScriptOnReady(documentScript, resolve): any {
    documentScript.onreadystatechange = () => {
      if (documentScript.readyState === 'loaded' || documentScript.readyState === 'complete') {
        documentScript.onreadystatechange = null;
        this.scriptStores[name].loaded = true;
        resolve({ script: name, loaded: true, status: 'Loaded' });
      }
    };
  }
  private buildOnLoad(documentScript, resolve, name: string) {
    documentScript.onload = () => {
      this.scriptStores[name].loaded = true;
      resolve({ script: name, loaded: true, status: 'Loaded' });
    };
  }
}
