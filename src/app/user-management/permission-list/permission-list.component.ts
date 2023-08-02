import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { async, lastValueFrom } from 'rxjs';
import { ErrorParserService } from 'src/app/services/error-parser.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  dataSource: CustomStore<any, any>;
  constructor(private httpClient:HttpClient) {


    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'title',
      load:(loadOptions: any)=> {
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
            `${environment.ApiAddress}/roles/permissiontype/list`,{params}
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
            throw `Data Loading Error ${errorMessage}`;
          });
      },
      insert:(e: any)=> {
        return httpClient
          .post(`${environment.ApiAddress}/roles/permissiontype/add?request=${e.title}`, {})
          .toPromise();
      },
     
       remove:async (key)=>{

          httpClient.delete(`${environment.ApiAddress}/roles/permissiontype/delete?request=${key}`).toPromise();
       }
    });


   }
removeItem($event:any){
console.log($event);


 // 
        

}
  ngOnInit(): void {
  }

}
