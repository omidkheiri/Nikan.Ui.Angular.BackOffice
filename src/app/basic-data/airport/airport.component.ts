import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit  {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
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
        return fetch(`${environment.flightAddress}/Airport${params}`)
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
          .post(`${environment.flightAddress}/Airport`, values)
          .toPromise().catch((error:any)=>{
            console.log(error);
           return error;});
      },
      update: (key, values) => {
      
        var item = this.dataGrid.instance
          .getDataSource()
          .items()
          .find((data: any) => {
            return data.id === key;
          });
        if (values.name) item.name = values.name;
        if (values.city) item.city = values.city;

        console.log(item);

        return httpClient
          .put(`${environment.flightAddress}/Airport/${key}`, item)
          .toPromise();
      },
      remove: async (key)=>  {
        httpClient
          .delete(`${environment.flightAddress}/Airport/` + key)
          .toPromise().catch((error:any)=>{console.log(error);
          });
       
      }
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
