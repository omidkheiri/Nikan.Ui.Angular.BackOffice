import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as fromApp from '../../store/app.reducer';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { ErrorParserService } from 'src/app/services/error-parser.service';
@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css'],
})
export class FormCategoryComponent implements OnInit, OnDestroy {
  storeSub: any;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  tenatId: string | null;
  contentReady($event: any) {
    throw new Error('Method not implemented.');
  }
  dataSource: CustomStore<any, any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,

    private store: Store<fromApp.AppState>
  ) {
    router.events.subscribe((val: any) => {
      if (this.dataGrid) this.dataGrid.instance.refresh();
    });
    this.storeSub = this.store.select('formBuilder');
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
          httpClient.get(
            `${environment.ApiAddress}/FormTemplate/FromCategory`,
            {
              params,
            }
          )
        )
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);

            throw `Data Loading Error ${errorMessage}`;
          });
      },
      insert(e: any) {
        return httpClient
          .post(`${environment.ApiAddress}/FormTemplate/FromCategory`, e)
          .toPromise()
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            Swal.fire({ text: errorMessage });
          });
      },
      update(key: any, e: any) {
        return httpClient
          .put(`${environment.ApiAddress}/FormTemplate/FromCategory/${key}`, e)
          .toPromise()
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            Swal.fire({ text: errorMessage });
          });
      },
      remove: async (key: any) => {
        httpClient
          .delete(`${environment.ApiAddress}/FormTemplate/FromCategory/${key}`)
          .toPromise()
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            Swal.fire({ text: errorMessage });
          });
      },
    });
  }
  ngOnDestroy(): void {}
  nav(d: any) {}
  ngOnInit(): void {}
  onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
    e.cancel = true;
  }

  onAddOpen() {
    this.router.navigate(['/dashboard/tenants/List/add']);
  }
}
