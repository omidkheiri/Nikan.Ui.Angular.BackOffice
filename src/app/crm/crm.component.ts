import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css'],
})
export class CrmComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit(): void {}
}
