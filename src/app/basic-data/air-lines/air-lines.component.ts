import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-air-lines',
  templateUrl: './air-lines.component.html',
  styleUrls: ['./air-lines.component.css'],
})
export class AirLinesComponent implements OnInit {
  dataSource: CustomStore;

  constructor(private httpClient: HttpClient) {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'id',
      load: (loadOptions: any) => {
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
        return fetch(`${environment.flightAddress}/AirlineName${params}`)
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
      insert: (values) => {
        return httpClient
          .post(`${environment.flightAddress}/AirlineName`, values)
          .toPromise();
      },
      update: (key, values) => {
        return httpClient
          .put(`${environment.flightAddress}/AirlineName/${key}`, values)
          .toPromise();
      },
      onRemoving: function (key) {
        httpClient
          .delete(`${environment.flightAddress}/AirlineName/` + key)
          .toPromise();
        location.reload();
      },
      onRemoved: function (key) {
        httpClient
          .delete(`${environment.flightAddress}/AirlineName/` + key)
          .toPromise();
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
}
