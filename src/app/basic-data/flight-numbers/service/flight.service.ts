import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private refreshList = new BehaviorSubject('');

  setRefreshObs(data: any) {
    this.refreshList.next(data);
  }
  getrefreshObs(): Observable<string> {
    return this.refreshList.asObservable();
  }
}
