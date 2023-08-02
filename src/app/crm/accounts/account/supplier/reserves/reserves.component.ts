import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';

import { environment } from 'src/environments/environment';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/crm/Services/account.service';
import DataSource from 'devextreme/data/data_source';
@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css'],
})
export class ReservesComponent implements OnInit {
  dataSource: any;
  accountId: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private accountService: AccountService
  ) {
    var autofilter = null;
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }
    accountService.getaccountIdObs().subscribe((data: string) => {
      this.accountId = data;
      autofilter =   autofilter = [
      
        
        [ "arrivalSupplierId", "=", this.accountId ],
        "or",
        [ "departureSupplierId", "=", this.accountId ]
    
] ;
    });
    this.dataSource = new DataSource({
      key: 'id',
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
          httpClient.get(`${environment.ReserveAddress}/Reserve`, {
            params,
          })
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

  getStyle(item: any) {
    switch (item) {
      case 0:
        return 'badge badge-success';
        break;
      case 1:
        return 'badge badge-success';
        break;
      case 2:
        return 'badge badge-warning';
        break;
      case 3:
        return 'badge badge-info';
        break;
      case 4:
        return 'badge badge-success';
        break;
      case 5:
        return 'badge badge-success';
        break;
      default:
        break;
    }
    return "";
  }
  getStatus(item: any) {
    switch (item) {
      case 0:
        return 'Draft';
        break;
      case 1:
        return 'Submitted';
        break;
      case 2:
        return 'Pay Waiting';
        break;
      case 3:
        return 'Paid';
        break;
      case 4:
        return 'Sent';
        break;
      case 5:
        return 'Cancelled';
        break;
      default:
        break;
    }
    return "";
  }
  onNavigateToReserve(item: any) {
    this.router.navigate([
      `/dashboard/reserve/Reserve/${item.data.tripId}`,
    ]);
  }
  onNavigateToPayment(item: any) {
    this.router.navigate([
      `/dashboard/reserve/Payment/${item.data.tripId}`,
    ]);
  }
}
