import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromStore from '../store';
import * as fromaction from 'src/app/crm/store/account.action';
import { exportDataGrid } from 'devextreme/excel_exporter';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  dataSource: any = {};
  constructor(
    httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    store.dispatch(fromaction.accountSaved({ payload: false }));

    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'id',
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
          httpClient.get(`${environment.baseAddress}/accountreport?${params}`)
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
  // navigate(data: any) {

  //   this.router.navigate(["/da",data.value], );
  // }
  AddAccount() {
    this.router.navigate(['/dashboard/crm/accountform']);
  }
  onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet');

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
}
