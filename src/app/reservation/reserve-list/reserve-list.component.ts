import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css'],
})
export class ReserveListComponent implements OnInit {
  dataSource: CustomStore<any, any>;

  constructor(private httpClient: HttpClient, private router: Router) {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'Id',
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
    console.log("VVVVVVVVVVVVVVVVVVVVV",item.data.ReserveStatus);
    
    switch (item.data.ReserveStatus) {
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
        return 'badge badge-danger';
        break;
        case 6:
          return 'badge badge-danger';
          break;
      default:
        break;
    }
    return "";
  }
  getStatus(item: any) {
    switch (item.data.ReserveStatus) {
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
        case 6:
          return 'ChangeAfterSubmit';
        break;
      default:
        break;
    }
    return "";
  }
  onNavigateToReserve(item: any) {
   
    
    this.router.navigate([
      `/dashboard/reserve/Reserve/${item.data.TripAggregateId}`,
    ]);
  }
  onNavigateToPayment(item: any) {
    this.router.navigate([
      `/dashboard/reserve/Payment/${item.data.TripAggregateId}`,
    ]);
  }
}
