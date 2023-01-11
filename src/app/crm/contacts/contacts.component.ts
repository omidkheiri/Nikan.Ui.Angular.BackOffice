import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromaction from 'src/app/crm/store/account.action';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { AccountService } from '../Services/account.service';
import { ContactService } from '../Services/contact.service';
import DataSource from 'devextreme/data/data_source';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  dataSource: any = {};
  accountId: string;
  constructor(
    private accountService: AccountService,
    private contactService: ContactService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    var autofilter = null;
    store.dispatch(fromaction.accountSaved({ payload: false }));
    console.log((this.router.url + '').toLowerCase());

    if ((this.router.url + '').toLowerCase() !== '/dashboard/crm/contacts') {
      accountService.getAccountIdObs().subscribe((data: string) => {
        this.accountId = data;
        autofilter = ['accountId', '=', this.accountId];
      });
    }

    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new DataSource({
      key: 'contactId',
      filter: autofilter,
      load(loadOptions: any) {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });
        return lastValueFrom(
          httpClient.get(`${environment.baseAddress}/contactReport?${params}`)
        )
          .then((data: any) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount,
          }))
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
  }

  ngOnInit(): void {}

  onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
    e.cancel = true;
  }
  AddContact() {
    this.router.navigate(['/dashboard/crm/Contactform']);
  }
  LoadContact(data: any) {
    this.accountService.setAccountIdObs(data.data.accountId);
    this.contactService.setContactIdObs(data.data.contactId);
    this.router.navigate([
      '/dashboard/crm/Contact',
      data.data.accountId,
      data.data.contactId,
    ]);
  }
}
