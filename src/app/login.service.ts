import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
export class LoggingService {
  lastlog: string | any;

  printLog(message: string) {
    this.lastlog = message;
  }
}
