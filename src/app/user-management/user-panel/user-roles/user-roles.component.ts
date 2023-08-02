import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import { lastValueFrom } from 'rxjs';
import { ErrorParserService } from 'src/app/services/error-parser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  @Input() itemId: string;
  userRoles:any;
  dataSource: CustomStore<any, any>;
  constructor(private httpClient:HttpClient) {
    
    this.dataSource = new CustomStore({
    key: 'id',
    load(loadOptions: any) {
      function isNotEmpty(value: any): boolean {
        return value !== undefined && value !== null && value !== '';
      }
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
          `${environment.ApiAddress}/roles/internalRoles/list`,
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
  }); }

  ngOnInit(): void {
   this.loadRoles();
  }
  loadRoles() {
  this.httpClient.get(`${environment.ApiAddress}/backOfficeUser/${this.itemId}`).subscribe((data:any)=>{
console.log(data);

    this.userRoles=data.roles;

  })
  }
  AddRole(roleItem:any){

this.httpClient.put(`${environment.ApiAddress}/BackOfficeUser/${this.itemId}/AddRole/${roleItem.value}`,null).subscribe((data:any)=>{

  this.showAlert("Role Added successfully.", 'success');

  this.loadRoles();

})

  }
  RemoveRole(id:any){

    this.httpClient.delete(`${environment.ApiAddress}/BackOfficeUser/${this.itemId}/RemoveRole/${id}`).subscribe((data:any)=>{

      this.showAlert("Role removed successfully.", 'success');

      this.loadRoles();
    
    })

  }
  private showAlert(message: string, type: string) {
    notify(
      {
        message: message,
        height: 45,
        width: 325,
        minWidth: 325,
        position: {
          my: 'right bottom',
          at: 'right bottom',
        },
      },
      type,
      4500
    );
  }

}


