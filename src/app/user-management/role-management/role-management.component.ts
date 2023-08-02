import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { ErrorParserService } from 'src/app/services/error-parser.service';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  dataSource: any;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  constructor(private httpClient: HttpClient) {
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
          httpClient.get(`${environment.ApiAddress}/roles/internalroles/list`, {
            params,
          })
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
            throw `Data Loading Error ${errorMessage}`;
          });
      },
      insert(e: any) {
        return httpClient.post(`${environment.ApiAddress}/roles/internalRoles/add`, e)
          .toPromise();
      },
    });
  }

  ngOnInit(): void {}

  addRow() {
    this.dataGrid.instance.addRow();
  }
  onRemoveRole(e: any) {
   
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'This role will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
       
       
this.httpClient.delete(`${environment.ApiAddress}/roles/internalRoles/delete/${e}`)
.subscribe((data:any)=>{
  this.dataGrid.instance.refresh();
},

error=>{
  var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(error);
Swal.fire({text:errorMessage})

}
)

      }
    });
  }
}
