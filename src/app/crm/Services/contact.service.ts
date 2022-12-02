import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactId = new BehaviorSubject('');
  constructor(private http: HttpClient) {}
  setContactIdObs(accountId: string) {
    this.contactId.next(accountId);
  }
  getContactIdObs(): Observable<string> {
    return this.contactId.asObservable();
  }
}
