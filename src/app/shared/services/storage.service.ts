import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  clear():void  {
    sessionStorage.clear();
  }
  save(key: string, value: any):void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  get(key:string): any {
    let value:any
    if (sessionStorage.getItem(key)) {
      let valueStorage:any = sessionStorage.getItem(key)
      value = JSON.parse(valueStorage)
    }
    return value;
  }

  delete(key: string):void  {
    sessionStorage.removeItem(key);
  }
}
