import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { environment } from 'src/environments/environment';
import { FlightService } from './service/flight.service';

@Component({
  selector: 'app-flight-numbers',
  templateUrl: './flight-numbers.component.html',
  styleUrls: ['./flight-numbers.component.css'],
})
export class FlightNumbersComponent implements OnInit {
  dataSource: CustomStore;

  constructor(
    private http: HttpClient,
    private router: Router,

    private service: FlightService
  ) {
    this.loadList(http);
  }
  loadList(http: HttpClient) {
    function isNotEmpty(value: any) {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'id',
      load(loadOptions: any) {
        let params = '?';
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
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
          }
        });
        params = params.slice(0, -1);

        return fetch(`${environment.flightAddress}/FlightNumber${params}`)
          .then((response) => response.json())
          .then((data) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount,
          }))
          .catch(() => {
            throw new Error('Data Loading Error');
          });
      },
    });
  }

  ngOnInit(): void {
    this.service.getrefreshObs().subscribe(() => {
      this.loadList(this.http);
    });
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
  AddAccount() {
    this.router.navigate(['/dashboard/basicdata/flights/flightForm']);
  }
}
