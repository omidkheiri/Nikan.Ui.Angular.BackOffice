import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  getAccountList(params: HttpParams) {
    return this.http.get(
      `${environment.FinancialAddress}/FinancialAccount/${this.contactId.value}`,
      {
        params,
      }
    );
  }
  private contactId = new BehaviorSubject('');
  constructor(private http: HttpClient) {}
  setcontactIdObs(accountId: string) {
    this.contactId.next(accountId);
  }
  getcontactIdObs(): Observable<string> {
    return this.contactId.asObservable();
  }
  getAccount(contactId: string) {
    return this.http.get<any>(
      `${environment.FinancialAddress}/FinancialAccount/${contactId}/Credit`
    );
  }
}
