import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogDetailViewComponent } from '../../shared/log-detail-view/log-detail-view.component';
import {Location} from '@angular/common';
import { ErrorParserService } from 'src/app/services/error-parser.service';
@Component({
  selector: 'app-form-category-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  popupTitle="Audit Log";
  entityId: any;
  dataSource: CustomStore<any, any>;
  constructor(private _location: Location,
    private route:Router,
    private httpClient:HttpClient,
    private activeRoute:ActivatedRoute){

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
          httpClient.get(`${environment.ApiAddress}/AuditLog/ItemList/${activeRoute.snapshot.paramMap.get('Id')?.toLowerCase()}`, {
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
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            throw `Data Loading Error ${errorMessage}`;
          });
      },
    });
   }

  ngOnInit(): void {
  }
  popup_hidden($event:any){


    this._location.back();
  }
}
