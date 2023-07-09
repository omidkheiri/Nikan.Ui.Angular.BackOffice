import { Component, OnInit } from '@angular/core';

import * as fromStore from '../../../store';

import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { AccountService } from '../../../Services/account.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { loadAccount } from 'src/app/crm/store/account.action';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  accountId: string;
  saved = false;
  introValue = '';
  constructor(
    private store: Store<fromStore.CrmModuleState>,

    private route: ActivatedRoute,
    private httpClinet: HttpClient,
    private AccountService: AccountService
  ) {
    store.select<any>('CRM').subscribe((data: any) => {
      this.accountId = data.account.account.id;

      this.introValue = data.account.account.intro;
    });
    this.AccountService.getaccountIdObs().subscribe(
      (accountId) => (this.accountId = accountId)
    );
  }

  ngOnInit(): void {}
  saveIntro(e: any) {
    console.log(e.value);
    var value = {
      intro: e.value,
    };
    this.httpClinet
      .put(
        `${environment.accountAddress}/Account/${this.accountId}/SetIntro`,
        value
      )
      .subscribe(() => {
        this.store.dispatch(loadAccount({ payload: this.accountId }));
        this.saved = true;
      });
  }
}
