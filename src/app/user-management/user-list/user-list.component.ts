import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorParserService } from 'src/app/services/error-parser.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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

   
  ) {


    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    router.events.subscribe((val: any) => {
      if (this.dataGrid) this.dataGrid.instance.refresh();
      //this.storeSub.dispatch(fromAction.AddTenantResetForm());
    });
    
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
            `${environment.ApiAddress}/BackOfficeUser`,
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
          .catch((error) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            throw `Data Loading Error ${errorService}`;
          });
      }
      
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
    this.router.navigate(['/dashboard/users/userList/add']);
  }

}
