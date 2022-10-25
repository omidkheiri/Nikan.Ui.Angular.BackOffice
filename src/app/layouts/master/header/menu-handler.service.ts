import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuHandlerService {
  menuStatus = new Subject<boolean>();
  constructor() {
    this.menuStatus.subscribe((subscriber) => {
      if (subscriber) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('topbar-closed');
      } else {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('topbar-closed');
      }
    });
  }
}
