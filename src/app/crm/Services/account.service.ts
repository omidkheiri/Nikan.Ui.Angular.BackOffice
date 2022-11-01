import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscribable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  getAccount(id: string) {
    return this.http.get<Account>(
      `${environment.accountAddress}/account/${id}`
    );
  }
  putAccount(account: Account) {
    return this.http.put<Account>(
      `${environment.accountAddress}/account/${account.id}`,
      account
    );
  }
}
