import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountId = new BehaviorSubject('');
  setAccountIdObs(accountId: string) {
    this.accountId.next(accountId);
  }
  getAccountIdObs(): Observable<string> {
    return this.accountId.asObservable();
  }
  constructor(private http: HttpClient) {}

  getAccount(id: string) {
    return this.http.get<Account>(
      `${environment.accountAddress}/account/${id}`
    );
  }
  putAccount(account: Account) {
    return this.http.put<Account>(
      `${environment.accountAddress}/Account/${account.id}`,
      account
    );
  }
  postAccount(account: Account) {
    return this.http.post<Account>(
      `${environment.accountAddress}/account`,
      account
    );
  }
}
