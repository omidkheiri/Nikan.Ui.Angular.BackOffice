import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/crm/Services/account.service';
import { ContactService } from 'src/app/crm/Services/contact.service';
import { ServiceService } from 'src/app/crm/Services/reserve.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-reserves',
  templateUrl: './contact-reserves.component.html',
  styleUrls: ['./contact-reserves.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactReservesComponent implements OnInit {
  dataSource: DataSource<any, any>;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  conatctId: any;
  // Prior to Angular 8
  // @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  _httpClient: any;
  constructor(
    private httpClient: HttpClient,
    private router: Router,

    private contactService: ContactService,
    private reserveService: ServiceService,
    private ref: ChangeDetectorRef
  ) {
    this._httpClient = httpClient;

    contactService.getcontactIdObs().subscribe((data) => {
      this.conatctId = data;
    });
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }
    this.dataSource = new DataSource({
      key: 'id',
      filter: ['contactId', '=', this.conatctId],
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
    this.ref.markForCheck();
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
        return 'badge badge-success';
        break;
      case 3:
        return 'badge badge-success';
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
    return;
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
    return;
  }
  onNavigateToreserve(item: any) {
    this.router.navigate([
      `/dashboard/reserve/Reserve/${item.data.locationId}/${item.data.reserveUniqueId}`,
    ]);
  }
  onNavigateToPayment(item: any) {
    this.router.navigate([
      `/dashboard/reserve/Payment/${item.data.reserveUniqueId}`,
    ]);
  }
}
